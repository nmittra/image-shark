import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { WatermarkPanel } from './WatermarkPanel'
import { BrowserRouter } from 'react-router-dom'

// Mock the useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual as object,
    useNavigate: () => vi.fn()
  }
})

// Mock the useToast hook
vi.mock('@chakra-ui/react', async () => {
  const actual = await vi.importActual('@chakra-ui/react')
  return {
    ...actual as object,
    useToast: () => vi.fn()
  }
})

describe('WatermarkPanel', () => {
  const mockImage = {
    file: new File(['dummy content'], 'test.png', { type: 'image/png' }),
    preview: 'data:image/png;base64,dummyBase64String'
  }
  const mockSetEditedImage = vi.fn()

  it('renders correctly with default values', () => {
    render(
      <BrowserRouter>
        <WatermarkPanel image={mockImage} setEditedImage={mockSetEditedImage} />
      </BrowserRouter>
    )

    // Check if the component renders with default values
    expect(screen.getByPlaceholderText('Enter watermark text')).toBeInTheDocument()
    expect(screen.getByText('Font Size: 24px')).toBeInTheDocument()
    expect(screen.getByText('Opacity: 50%')).toBeInTheDocument()
    expect(screen.getByText('X: 50%')).toBeInTheDocument()
    expect(screen.getByText('Y: 50%')).toBeInTheDocument()
    expect(screen.getByText('Rotation: 0°')).toBeInTheDocument()
  })

  it('updates text when input changes', () => {
    render(
      <BrowserRouter>
        <WatermarkPanel image={mockImage} setEditedImage={mockSetEditedImage} />
      </BrowserRouter>
    )

    const textInput = screen.getByPlaceholderText('Enter watermark text')
    fireEvent.change(textInput, { target: { value: 'Test Watermark' } })
    
    expect(textInput).toHaveValue('Test Watermark')
  })

  it('disables buttons when text is empty', () => {
    render(
      <BrowserRouter>
        <WatermarkPanel image={mockImage} setEditedImage={mockSetEditedImage} />
      </BrowserRouter>
    )

    // Buttons should be disabled initially when text is empty
    expect(screen.getByText('Preview')).toBeDisabled()
    expect(screen.getByText('Apply Watermark')).toBeDisabled()

    // Enter text to enable buttons
    const textInput = screen.getByPlaceholderText('Enter watermark text')
    fireEvent.change(textInput, { target: { value: 'Test Watermark' } })

    // Buttons should be enabled now
    expect(screen.getByText('Preview')).not.toBeDisabled()
    expect(screen.getByText('Apply Watermark')).not.toBeDisabled()
  })
})