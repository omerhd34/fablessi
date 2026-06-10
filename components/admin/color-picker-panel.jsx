/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import {
 colorValueToPickerHex,
 hexToHsv,
 hsvToHex,
 hsvToRgb,
 rgbToHsv,
} from "@/lib/color-value";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function clamp(value, min, max) {
 return Math.min(max, Math.max(min, value));
}

export function ColorPickerPanel({ value, onChange, className }) {
 const areaRef = useRef(null);
 const hueRef = useRef(null);
 const [hsv, setHsv] = useState(() => hexToHsv(value));
 const hsvRef = useRef(hsv);

 useEffect(() => {
  hsvRef.current = hsv;
 }, [hsv]);

 useEffect(() => {
  const next = hexToHsv(colorValueToPickerHex(value));
  hsvRef.current = next;
  setHsv(next);
 }, [value]);

 const hex = hsvToHex(hsv.h, hsv.s, hsv.v);
 const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);

 function applyHsv(next) {
  hsvRef.current = next;
  setHsv(next);
  onChange(hsvToHex(next.h, next.s, next.v));
 }

 function updateFromArea(clientX, clientY) {
  const rect = areaRef.current?.getBoundingClientRect();
  if (!rect) return;

  applyHsv({
   ...hsvRef.current,
   s: Math.round(clamp((clientX - rect.left) / rect.width, 0, 1) * 100),
   v: Math.round(clamp(1 - (clientY - rect.top) / rect.height, 0, 1) * 100),
  });
 }

 function updateFromHue(clientX) {
  const rect = hueRef.current?.getBoundingClientRect();
  if (!rect) return;

  applyHsv({
   ...hsvRef.current,
   h: Math.round(clamp((clientX - rect.left) / rect.width, 0, 1) * 360),
  });
 }

 function handleRgbChange(channel, nextValue) {
  const parsed = Number(nextValue);
  if (!Number.isFinite(parsed)) return;

  const nextRgb = { ...rgb, [channel]: parsed };
  applyHsv(rgbToHsv(nextRgb.r, nextRgb.g, nextRgb.b));
 }

 return (
  <div className={cn("space-y-4", className)}>
   <div
    ref={areaRef}
    className="relative h-48 w-full cursor-crosshair overflow-hidden rounded-xl ring-1 ring-border/60"
    style={{ backgroundColor: `hsl(${hsv.h} 100% 50%)` }}
    onPointerDown={(event) => {
     event.currentTarget.setPointerCapture(event.pointerId);
     updateFromArea(event.clientX, event.clientY);
    }}
    onPointerMove={(event) => {
     if (event.buttons !== 1) return;
     updateFromArea(event.clientX, event.clientY);
    }}
   >
    <div className="absolute inset-0 bg-linear-to-r from-white to-transparent" />
    <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
    <div
     className="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md ring-1 ring-black/15"
     style={{
      left: `${hsv.s}%`,
      top: `${100 - hsv.v}%`,
     }}
    />
   </div>

   <div
    ref={hueRef}
    className="relative h-4 w-full cursor-pointer overflow-hidden rounded-full ring-1 ring-border/60"
    style={{
     background:
      "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
    }}
    onPointerDown={(event) => {
     event.currentTarget.setPointerCapture(event.pointerId);
     updateFromHue(event.clientX);
    }}
    onPointerMove={(event) => {
     if (event.buttons !== 1) return;
     updateFromHue(event.clientX);
    }}
   >
    <div
     className="pointer-events-none absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md ring-1 ring-black/15"
     style={{ left: `${(hsv.h / 360) * 100}%` }}
    />
   </div>

   <div className="flex items-center gap-3">
    <div
     className="size-11 shrink-0 rounded-lg border border-border/70 shadow-sm ring-1 ring-foreground/5"
     style={{ backgroundColor: hex }}
     aria-hidden
    />
    <div className="grid flex-1 grid-cols-3 gap-2">
     {(["r", "g", "b"]).map((channel) => (
      <div key={channel} className="space-y-1">
       <Label className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {channel}
       </Label>
       <Input
        type="number"
        min={0}
        max={255}
        value={rgb[channel]}
        onChange={(event) => handleRgbChange(channel, event.target.value)}
        className="h-8 px-2 text-center font-mono text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
       />
      </div>
     ))}
    </div>
   </div>

   <div className="space-y-1">
    <Label className="text-[11px] uppercase tracking-wide text-muted-foreground">Hex</Label>
    <Input
     value={hex}
     readOnly
     className="h-8 font-mono text-sm uppercase"
    />
   </div>
  </div>
 );
}
