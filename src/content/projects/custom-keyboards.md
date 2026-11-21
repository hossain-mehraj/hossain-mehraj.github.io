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

Stock switches rarely land exactly where a client wants, so I take them apart and rebuild them from parts of different switches. This is one I documented start to finish.

#### Frankenswitch: Zaku × Milky Yellow

**Goal:** a linear that sounds deeper and softer than a stock Zaku, but feels crisper and snappier than a stock Milky Yellow.

Neither switch did both. The Zaku had the feel I wanted and the Milky Yellow had the sound, so I took them both apart and kept the parts that did each job.

![Two switches on a desk among switch-modding tools: a Zaku with a white stem on the left and a Milky Yellow with a yellow stem on the right](../../assets/projects/custom-keyboards/franken-01-donors.jpg "The two donor switches: Zaku on the left, Milky Yellow on the right.")

![Both switches fully disassembled in two rows, each row showing bottom housing, top housing, stem and spring](../../assets/projects/custom-keyboards/franken-02-teardown.jpg "Both switches apart: Zaku on top, Milky Yellow below. Left to right: bottom housing, top housing, stem, spring.")

**Housings from the Milky Yellow.** When the stem bottoms out or springs back up, it's the housing that rings, so the housing sets most of the pitch. The Milky Yellow's milky housings are a softer, more damped plastic than the Zaku's white ones. That pulls the sound lower and rounds off the clack, which covers the "deeper" half of the goal.

![Two top housings side by side: a translucent milky housing on the left and a solid white housing on the right](../../assets/projects/custom-keyboards/franken-03-housings.jpg "Housings: Milky Yellow on the left (kept), Zaku on the right.")

**Stem from the Zaku.** The Zaku stem has the longer centre pole. A longer pole hits the bottom housing just before the rest of the stem would, so travel is slightly shorter and the bottom-out is one clean, firm stop instead of a soft landing. That's the "crisper" half. And because it now bottoms out in a Milky Yellow housing, the sound stays low instead of turning clacky.

![Two switch stems side by side: a yellow stem on the left and a white stem with a longer centre pole on the right](../../assets/projects/custom-keyboards/franken-04-stems.jpg "Stems: Milky Yellow on the left, Zaku on the right (kept), with the longer pole.")

**Spring from the Zaku.** The Zaku uses a double-action spring, which has two rates: light for the first part of the press, then stiffer near the bottom. The key starts easy, the extra force slows the stem before it hits bottom so it doesn't slam, and the same stored force pushes the key back up faster. That's where the "snappier" comes from.

![Two springs side by side: a shorter single-rate spring on the left and a longer double-action spring on the right](../../assets/projects/custom-keyboards/franken-05-springs.jpg "Springs: Milky Yellow on the left, Zaku double-action on the right (kept). The tighter coils mark where the rate changes.")

**Film.** Parts from two different switches don't always sit perfectly tight, and a loose top housing wobbles and rattles. That rattle is what makes a switch sound hollow and inconsistent from key to key. A thin film between the two housing halves takes up the gap, so the housing behaves like one solid part.

![Placing a thin clear switch film onto the Milky Yellow bottom housing with tweezers](../../assets/projects/custom-keyboards/franken-06-film.jpg "Placing the film on the Milky Yellow bottom housing.")
![The Milky Yellow bottom housing on a switch opener with the film seated around its edge](../../assets/projects/custom-keyboards/franken-07-film-seated.jpg "Film seated, ready for the stem and spring.")

**Lube.** A thin coat on the stem's sliding rails and on the spring. It smooths out the travel and stops the spring pinging, without using so much that the key feels slow to come back up.

**Assembly.** The Zaku spring and stem go into the Milky Yellow bottom housing, then the Milky Yellow top closes over them.

![The Zaku stem and spring being lowered into the Milky Yellow bottom housing on a switch opener](../../assets/projects/custom-keyboards/franken-08-stem-spring.jpg "Zaku stem and spring going into the Milky Yellow bottom.")
![The finished frankenswitch on the opener with the Milky Yellow top housing closed over the Zaku stem](../../assets/projects/custom-keyboards/franken-09-finished.jpg "Milky Yellow top on: the finished switch.")

**Result:** the Milky Yellow's lower, softer sound, with the Zaku's firmer bottom-out and quicker return.

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

