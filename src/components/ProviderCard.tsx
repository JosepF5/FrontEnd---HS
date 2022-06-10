import React from 'react'

interface ProviderCardTypes{
    index: string;
    name: string;
    dni: number;
    phone: number;
}

function ProviderCard({name,index,dni,phone}:ProviderCardTypes) {
  return (
    <div>
        <h5>{name}</h5>
        <h5>{index}</h5>
        <h5>{dni}</h5>
        <h5>{phone}</h5>
    </div>
  )
}

export default ProviderCard
