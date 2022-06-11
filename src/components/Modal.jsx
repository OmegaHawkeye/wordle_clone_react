import React from 'react'
import { Dialog } from '@headlessui/react'

export const Modal = ({
  title = '',
  description = '',
  open,
  onClose,
  button,
  children,
}) => {
  return (
    <Dialog
      as='div'
      className='fixed inset-0 z-10 overflow-y-auto'
      onClose={onClose}
      open={open}>
      <div className='min-h-screen px-4 text-center'>
        <Dialog.Overlay className='fixed inset-0' />
        <span className='inline-block h-screen align-middle' aria-hidden='true'>
          &#8203;
        </span>
        <div className='my-8 inline-block w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl text-center'>
          <Dialog.Title
            as='h2'
            className='select-none text-2xl font-semibold uppercase leading-relaxed text-gray-900'>
            {title}
          </Dialog.Title>
          {description !== '' && (
            <Dialog.Description>{description}</Dialog.Description>
          )}
          {children}
          {button && <div className='mt-4 flex justify-end'>{button}</div>}
        </div>
      </div>
    </Dialog>
  )
}
