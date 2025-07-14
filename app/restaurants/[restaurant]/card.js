"use client";
import React from "react";
import { PinContainer } from ".././../../components/ui/3d-pin";

export function AnimatedPinDemo({item}) {
    console.log(item)
    return (
        
        <div className=" ">
            <PinContainer title={item.name} item={item} containerClassName="h-80"
                className="w-80">
                <div
                    className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-80 h-fit ">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-700">
                        {item.name}
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal">
                        <span className="text-green-500 ">
                            {item.price}
                        </span>
                    </div>
                    <div className="flex flex-1 w-70 h-60 rounded-lg mt-2 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500">
                        <img className="rounded-lg h-60 w-70" src={item.image} />    
                    </div>
                </div>
            </PinContainer>
        </div>
    );
}
