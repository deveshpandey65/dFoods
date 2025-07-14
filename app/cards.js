"use client"
import { HoverEffect } from "../components/ui/card-hover-effect";

export function CardHoverEffectDemo({data,type}) {
    return (
        <div className="flex  justify-center items-center">
            <HoverEffect items={data} type={type} />
        </div>
    );
}
  