---
title: Custom Mechanical Keyboards
slug: custom-keyboards
summary: "My keyboard business: 22 builds, with cases I design in CAD."
icon: keyboard
thumbnail: ../../assets/projects/custom-keyboards/thumb.jpg
tags: [CAD, Business, Materials]
role: Founder and builder
dates: Dec 2022 – present
featured: true
order: 2
heroImage: ../../assets/projects/custom-keyboards/kb-75.jpg
heroAlt: Black 75 percent keyboard with a rotary knob and teal and navy keycaps
tools: [Onshape, CNC machining via PCBWay, Soldering, Switch modding]
stats:
  - { value: "22", label: "client builds" }
  - { value: "Dec 2022", label: "running since" }
  - { value: "3", label: "mounting styles built: top, O-ring, gasket" }
links: {}
---

## Overview

I've been building keyboards for people since December 2022. Twenty-two so far. Most clients come to me with a sound or a feel in mind rather than a parts list, and my job is to turn that into a board: the case, the switches, and how everything is mounted.

## Problem / Goal

"I want it to sound deep" or "I want it to feel light" isn't something you can order off a shelf. Every build starts by pinning down what the client actually means, then working backwards to the parts that will get there.

## What I did

- Designed custom cases in Onshape and had them CNC-machined in aluminum through PCBWay.
- Modded switches to match each brief: mixing housings and stems, filming, lubing, and swapping springs.
- Picked the mounting style for each board and built with top mount, O-ring, and gasket mounts.
- Soldered, assembled, and tested every board, and debugged clients' keyboard issues, including reflashing firmware.

## Process

### Case design

I've designed cases for several builds. One example:

**Goal:** a soft, even-feeling board that opens up easily and has room for an optional brass weight.

**How I got there:** I modelled the case in Onshape around an O-ring mount. The plate and PCB sit in a rubber O-ring pressed against the case walls, so no screws go through the plate and every key feels the same. Because the assembly floats, I moved the USB port onto a small daughterboard screwed into its own pocket, wired to the PCB through a milled channel, so plugging in a cable doesn't load the PCB. The brass weight (about three times denser than aluminum) gets a separate pocket with two screws, so it's optional. The case was CNC-machined in aluminum through PCBWay.

![CAD model of a keyboard case seen from below, with a brass weight in the base and a USB opening at the back](../../assets/projects/custom-keyboards/kb-cad-iso.png "Case from below, with the optional brass weight in gold.")
![CAD view of the case showing the daughterboard pocket, cable channel, and brass weight with two screws](../../assets/projects/custom-keyboards/kb-cad-inside.png "Daughterboard pocket and cable channel.")

![Corner of a keyboard showing a blue O-ring between the plate assembly and the case wall](../../assets/projects/custom-keyboards/kb-oring.jpg "The O-ring holding the assembly in a finished build.")
![Opened keyboard case with the USB daughterboard and its cable connected to the PCB](../../assets/projects/custom-keyboards/kb-open.jpg "Daughterboard in place, cabled to the PCB.")
![Underside of a hot-swap keyboard PCB](../../assets/projects/custom-keyboards/kb-pcb.jpg "Hot-swap PCB, reused from another board.")

### Switches

Stock switches rarely land exactly where a client wants, so I take them apart and rebuild them from parts of different switches. This is one I documented start to finish.

#### Frankenswitch: the Zaku-Y

The Zaku-Y is a Zaku (Tecsee) and a Gateron Milky Yellow combined into one switch.

**Goal:** the deeper, softer sound of the Milky Yellow with the firmer bottom-out and quicker return of the Zaku.

| Part | Zaku | Milky Yellow | Used in the Zaku-Y |
| --- | --- | --- | --- |
| Top housing | Polycarbonate (PC) | Nylon (PA66) | Milky Yellow |
| Bottom housing | Nylon | Nylon (PA66) | Milky Yellow |
| Stem | POM, longer centre pole | POM | Zaku |
| Spring | Stainless, double-stage, 63.5 g bottom-out | Stainless, single-stage, 62 g bottom-out | Zaku |

![Two switches on a desk among switch-modding tools: a Zaku with a white stem on the left and a Milky Yellow with a yellow stem on the right](../../assets/projects/custom-keyboards/franken-01-donors.jpg "The donor switches: Zaku on the left, Milky Yellow on the right.")

![Both switches fully disassembled in two rows, each row showing bottom housing, top housing, stem and spring](../../assets/projects/custom-keyboards/franken-02-teardown.jpg "Both switches apart: Zaku on top, Milky Yellow below. Left to right: bottom housing, top housing, stem, spring.")

**Housings: Milky Yellow.** The housing is what rings when the stem hits it, so its material sets the pitch. The Zaku's top is polycarbonate, an amorphous, glassy plastic that is stiff and has little internal damping, so it rings bright. The Milky Yellow's top is PA66 nylon, which is semi-crystalline and absorbs a little moisture, so it damps vibration and sounds lower. I kept both Milky Yellow halves rather than mixing housings, because a matched pair from the same mould fits tighter and wobbles less.

![Two top housings side by side: a translucent milky housing on the left and a solid white housing on the right](../../assets/projects/custom-keyboards/franken-03-housings.jpg "Top housings: Milky Yellow nylon on the left (kept), Zaku polycarbonate on the right.")

**Stem: Zaku.** Both stems are POM, which is slippery and wear-resistant, so either runs smoothly in nylon. The difference is length: the Zaku's longer centre pole bottoms out on the housing slightly earlier, giving shorter travel and a firm, defined stop. In a nylon housing that stop stays low-pitched instead of clacky.

![Two switch stems side by side: a yellow stem on the left and a white stem with a longer centre pole on the right](../../assets/projects/custom-keyboards/franken-04-stems.jpg "Stems: Milky Yellow on the left, Zaku on the right (kept), with the longer pole.")

**Spring: Zaku.** The Zaku's stainless double-stage spring is light at the start of the press, then stiffer near the bottom. The stiffer stage slows the stem before it hits the housing and stores more energy for the return stroke, so the key comes back up faster.

![Two springs side by side: a shorter single-stage spring on the left and a longer double-stage spring on the right](../../assets/projects/custom-keyboards/franken-05-springs.jpg "Springs: Milky Yellow on the left, Zaku double-stage on the right (kept). The tighter coils mark where the rate changes.")

**Film.** A thin film between the housing halves takes up the small gap between them, so the top can't wobble or rattle. A rattling housing sounds hollow and varies from key to key.

![Placing a thin clear switch film onto the Milky Yellow bottom housing with tweezers](../../assets/projects/custom-keyboards/franken-06-film.jpg "Placing the film on the Milky Yellow bottom housing.")
![The Milky Yellow bottom housing on a switch opener with the film seated around its edge](../../assets/projects/custom-keyboards/franken-07-film-seated.jpg "Film seated.")

**Lube and assembly.** A thin coat of lube on the stem rails and spring smooths the travel and stops spring ping. Then the Zaku spring and stem go into the Milky Yellow bottom, and the Milky Yellow top closes over them.

![The Zaku stem and spring being lowered into the Milky Yellow bottom housing on a switch opener](../../assets/projects/custom-keyboards/franken-08-stem-spring.jpg "Zaku stem and spring going into the Milky Yellow bottom.")
![The finished Zaku-Y on the opener with the Milky Yellow top housing closed over the Zaku stem](../../assets/projects/custom-keyboards/franken-09-finished.jpg "The finished Zaku-Y.")

**Result:** the Milky Yellow's lower, softer sound, with the Zaku's firmer bottom-out and quicker return.

### Mounting

**Goal:** match how the board feels under your fingers to the brief.

**How I get there:** for clients who want something firm and precise, I use a top mount, with the plate screwed straight into the case. For a softer, bouncier board with a more even sound, I use an O-ring or a gasket mount, where the plate floats on rubber or foam strips instead of being bolted down.

### Builds

![Black tenkeyless keyboard with black keycaps](../../assets/projects/custom-keyboards/kb-tkl.jpg "Tenkeyless build.")
![White 65 percent keyboard with pink and white keycaps](../../assets/projects/custom-keyboards/kb-65.jpg "65% build.")
![White 60 percent keyboard with white and yellow keycaps](../../assets/projects/custom-keyboards/kb-60.jpg "60% build, O-ring mounted.")

## Results / Impact

Twenty-two boards since December 2022, from tenkeyless down to 60%, several with custom aluminum cases I designed in CAD. No boards have come back.

## What I learned

Early on I built boards the way I like them: my favourite sound, my favourite feel. That was the wrong reference. The person paying is the one typing on it every day. Now I start from what the client asked for and treat my own taste as a suggestion.

I also learned that no single part makes the sound. The same switches sound different in a top-mount aluminum case and an O-ring case, so I test switches in the actual board before I finish a build.

