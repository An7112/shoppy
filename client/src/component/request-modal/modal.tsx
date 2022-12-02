import React from 'react'
import {AiOutlineLoading} from 'react-icons/ai'
import './modal.scss'

export function RequestModal() {
  return (
    <div className='modal-class' aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className='modal-frame'>
            <div className='modal-request'>
              <AiOutlineLoading className='load-icon'/>
              <p>Processing...</p>
            </div>
        </div>
    </div>
  )
}