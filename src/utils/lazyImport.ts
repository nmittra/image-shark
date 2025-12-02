import { lazy } from 'react';

// This helper function ensures proper lazy loading of components
export function lazyImport<T extends React.ComponentType<any>, I extends { [K2 in K]: T }, K extends keyof I>(
  factory: () => Promise<I>,
  name: K
): I {
  return Object.create({
    [name]: lazy(() => factory().then((module) => ({
      default: name === 'default' ? module.default : module[name]
    })))
  });
}

// Usage example:
// const { ComponentName } = lazyImport(() => import('./path/to/component'), 'ComponentName');