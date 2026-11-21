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
- Soldered, assembled, and tested every board, and repaired the ones that came back.

## Process

### Case design

**Goal:** a case for a client who wanted a board that felt soft and even, could be opened up for repairs, and had room for an optional brass weight.

**How I got there:** I modelled the case in Onshape around an O-ring mount. The plate and PCB sit in a rubber O-ring that presses against the case walls, so there are no screws through the plate and every key feels the same. That choice drove the rest of the design. Since the whole assembly floats, a USB port soldered to the PCB would move every time a cable was plugged in. So I gave the port its own small daughterboard, screwed into a pocket in the case and wired to the PCB through a milled channel. The brass weight got its own pocket in the base with two screws, so it could be left out. This client did leave it out. The case was machined in aluminum through PCBWay.

![CAD model of a keyboard case seen from below, with a brass weight in the base and a USB opening at the back](../../assets/projects/custom-keyboards/kb-cad-iso.png "Case from below, with the optional brass weight in gold.")
![CAD view of the case showing the daughterboard pocket, cable channel, and brass weight with two screws](../../assets/projects/custom-keyboards/kb-cad-inside.png "Daughterboard pocket and cable channel.")

![Corner of a keyboard showing a blue O-ring between the plate assembly and the case wall](../../assets/projects/custom-keyboards/kb-oring.jpg "The O-ring holding the assembly in a finished build.")
![Opened keyboard case with the USB daughterboard and its cable connected to the PCB](../../assets/projects/custom-keyboards/kb-open.jpg "Daughterboard in place, cabled to the PCB.")
![Underside of a hot-swap keyboard PCB](../../assets/projects/custom-keyboards/kb-pcb.jpg "Hot-swap PCB, reused from another board.")

### Switches

A switch comes apart into four pieces: a top housing, a bottom housing, a stem, and a spring. A frankenswitch is just a switch put back together from pieces of different switches. The most famous one is the Holy Panda, which is Halo stems dropped into Invyr Panda housings. Nobody sold it, people built it.

![A disassembled tactile MX-style switch: top housing, bottom housing, stem and spring laid out separately](../../assets/projects/custom-keyboards/switch-parts-tactile.jpg "The four parts I mix and match. Photo: Multicherry, CC BY-SA 4.0.")
![An opened linear MX-style switch with its stem, spring and both housings](../../assets/projects/custom-keyboards/switch-parts-linear.jpg "A linear switch opened up for lubing and filming. Photo: Dmitriy Nosachev, CC BY-SA 4.0.")

Two briefs come up the most:

**Goal: deep and quiet.** **How I get there:** a softer bottom housing to take the edge off each keypress, a smooth stem so nothing scratches, and a thin film between the housings so they don't rattle. Then a light coat of lube on the stem and housing rails, and a spring heavy enough that the bottom-out isn't harsh.

**Goal: a strong, rounded bump.** **How I get there:** this is the Holy Panda idea. A stem with a big tactile leg goes into housings that let the bump come through cleanly. I lube the rails and the spring but never the legs, or the bump goes mushy.

![A Holy Panda switch, with its keycap removed, sitting in a keyboard](../../assets/projects/custom-keyboards/holy-panda.jpg "A Holy Panda, the best-known frankenswitch. Photo: KazlMatas, CC BY-SA 4.0.")

Each time, I build a few test switches, put them in a board, and type on them before committing to a full set of 70 to 90.

### Mounting

**Goal:** match how the board feels under your fingers to the brief.

**How I get there:** for clients who want something firm and precise, I use a top mount, with the plate screwed straight into the case. For a softer, bouncier board with a more even sound, I use an O-ring or a gasket mount, where the plate floats on rubber or foam strips instead of being bolted down.

### Builds

![Black tenkeyless keyboard with black keycaps](../../assets/projects/custom-keyboards/kb-tkl.jpg "Tenkeyless build.")
![White 65 percent keyboard with pink and white keycaps](../../assets/projects/custom-keyboards/kb-65.jpg "65% build.")
![White 60 percent keyboard with white and yellow keycaps](../../assets/projects/custom-keyboards/kb-60.jpg "60% build, O-ring mounted.")

## Results / Impact

Twenty-two boards since December 2022, from tenkeyless down to 60%, plus a custom aluminum case designed and machined for a client.

## What I learned

Early on I built boards the way I like them: my favourite sound, my favourite feel. That was the wrong reference. The person paying is the one typing on it every day. Now I start from what the client asked for and treat my own taste as a suggestion.

I also learned that no single part makes the sound. The same switches sound different in a top-mount aluminum case and an O-ring case, so I test switches in the actual board before I finish a build.

<small>Switch photos from Wikimedia Commons, licensed [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/): [disassembled tactile switch](https://commons.wikimedia.org/wiki/File:Cherry_MX_Brown_switch_(disassembled).jpg) by Multicherry, [opened linear switch](https://commons.wikimedia.org/wiki/File:Cherry_MX_black_opened.jpg) by Dmitriy Nosachev, [Holy Panda](https://commons.wikimedia.org/wiki/File:An_Invyr_Holy_Panda_switch_inside_an_Idobao_ID80_keyboard.jpg) by KazlMatas. All other photos and CAD are my own.</small>
