import React from 'react'

interface ProviderCardTypes{
    idProvider: string;
    nameProvider: string;
    dniProvider: number;
    phoneProvider: number;
}

function ProviderCard({nameProvider,idProvider,dniProvider,phoneProvider}:ProviderCardTypes) {
  return (
    <div>
        <h5>{nameProvider}</h5>
        <h5>{idProvider}</h5>
        <h5>{dniProvider}</h5>
        <h5>{phoneProvider}</h5>
    </div>
  )
}

export default ProviderCard
