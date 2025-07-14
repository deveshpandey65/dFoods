"use client";;
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { motion } from "framer-motion";
export function GlowingEffectDemo({data}) {
    return (
        <ul
            className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
            <GridItem
                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
                title={data.title1}
                motiondir='left'
                image={data.img1}
                description={data.desc1} />
            <GridItem
                area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
                title={data.title2}
                image={data.img2}
                motiondir='left'
                description={data.desc2} />
            <GridItem
                area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
                title={data.title3}
                image={data.img3}
                motiondir='up'
                description={data.desc3} />
            <GridItem
                area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
                title={data.title4}
                image={data.img4}
                motiondir='right'
                description={data.desc4} />
            <GridItem
                area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
                title={data.title5}
                motiondir='right'
                image={data.img5}
                description={data.desc5} />
        </ul>
    );
}

const GridItem = ({
    area,
    icon,
    title,
    image,
    motiondir,
    description
}) => {
    // Determine motion direction
    const getInitial = (dir) => {
        switch (dir) {
            case "left":
                return { opacity: 0, x: -100 };
            case "right":
                return { opacity: 0, x: 100 };
            case "up":
                return { opacity: 0, y: -100 };
            default:
                return { opacity: 0 }; // fallback
        }
    };

    return (
        <li className={`min-h-[14rem] list-none ${area}`}>
            <motion.div
                initial={getInitial(motiondir)}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3"
            >
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                />
                <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={image}
                            alt="background"
                            className="w-full h-full object-cover opacity-16 blur-sm"
                        />
                    </div>

                    <div className="relative z-10 flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit rounded-lg border border-gray-600 p-2">
                            {icon}
                        </div>

                        <div className="absolute top-0 right-2">
                            <img
                                src={image}
                                alt="brand logo"
                                className="h-24 w-24 rounded-md object-contain shadow-md"
                            />
                        </div>

                        <div className="space-y-3">
                            <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                                {title}
                            </h3>
                            <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400">
                                {description}
                            </h2>
                        </div>
                    </div>
                </div>
            </motion.div>
        </li>
    );
  };
