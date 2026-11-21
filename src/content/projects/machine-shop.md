---
title: "Machine Shop: Drawn, Then Machined"
slug: machine-shop
summary: "Pen, pen box, and game board: drawn in CAD, then machined."
icon: wrench
thumbnail: ../../assets/projects/machine-shop/thumb.jpg
tags: [Machining, CAD, Drawings]
role: Designed, drawn, and machined by me
dates: 2023 – 2026
featured: true
order: 3
heroImage: ../../assets/projects/machine-shop/pen-inbox.jpg
heroAlt: An aluminum and brass pen resting in the milled pocket of an open aluminum box
heroCaption: The finished pen in its box. I designed both, drew them, and machined every part.
tools: [Onshape, AutoCAD, Manual lathe, Manual mill, CNC mill (Mastercam)]
stats:
  - { value: "±0.005 in", label: "tolerance held on mating parts (0.13 mm)" }
  - { value: "12+", label: "fully dimensioned drawings" }
  - { value: "3 yrs", label: "of lathe, mill, and CNC work" }
links: {}
---

## Overview

Three years of shop work with one rule: nothing gets cut until it's modelled in CAD and has a full drawing. Every part here was drawn in Onshape, then machined from that drawing on a manual lathe, a manual mill, or a CNC mill programmed in Mastercam.

## The goal

Drawings complete enough to machine from without asking questions, and parts that fit each other the first time.

## What I did

- Modelled every part in Onshape and checked fits in an assembly before cutting.
- Drew each part in inches, with thread, hole, and chamfer callouts and a tolerance block.
- Turned, drilled, tapped, and threaded on the lathe; pocketed, drilled, and countersunk on the mill.
- Programmed the CNC engraving on the box lid in Mastercam.

## Process

### 1. Pen: three turned parts and a standard refill

![The assembled pen: aluminum barrel with brass tip and brass end cap](../../assets/projects/machine-shop/pen-assembled.jpg "Aluminum barrel, brass tip and cap, all turned on the lathe.")
![The pen taken apart: brass tip, aluminum barrel, brass cap](../../assets/projects/machine-shop/pen-exploded.jpg "It comes fully apart, so the refill can be replaced.")

![Brass end cap with a domed head and threaded shank](../../assets/projects/machine-shop/pen-cap.jpg "Domed cap: nothing sharp at the end.")
![Brass tip with grip grooves, taper, and threaded shank](../../assets/projects/machine-shop/pen-tip.jpg "Tip with grip grooves for a polished part.")

- **Threads.** The barrel is tapped at both ends; the tip and cap have matching external threads.
- **Chamfered mouths** so the brass threads start cleanly instead of cross-threading.
- **Relief grooves** mark the joint to the brass and break up the plain cylinder.

> **What made it hard:** three parts have to share one axis. If a tapped hole is off-centre, the tip sits crooked, so the drawing calls for both ends to be tapped from the spindle.

![Engineering drawing of the pen barrel: 3.750 long, Ø.437, Ø.257 through bore, 5/16-24 UNF tapped both ends, two relief grooves](../../assets/projects/machine-shop/dwg-pen-barrel.png "Drawing: pen barrel (6061-T6).")
![Engineering drawing of the brass pen tip and end cap with thread, grip groove, taper and dome callouts](../../assets/projects/machine-shop/dwg-pen-tip-cap.png "Drawing: tip and end cap (C360 brass).")

### 2. Pen box: a milled case with a built-in hinge

![The closed box showing the CNC-engraved lid](../../assets/projects/machine-shop/box-lid.jpg "Lid artwork and name, programmed in Mastercam and CNC-milled.")
![The open, empty box showing the stepped pocket](../../assets/projects/machine-shop/box-open.jpg "Two-level pocket: the inner slot stops the pen rolling.")

![Close-up of a rounded hinge post on the base](../../assets/projects/machine-shop/box-hinge.jpg "Filleted hinge post, so the lid swings without catching.")
![Lid, base, and the two hinge screws laid out](../../assets/projects/machine-shop/box-parts.jpg "Lid, base, and the two screws that act as hinge pins.")

- **Built-in hinge.** Two posts left standing on the base take a screw each as a hinge pin, so there's no separate hinge hardware.
- **Notched lid** clears the posts and closes flush with the base.
- **Rounded inside corners** at the cutter radius, so there's nowhere for dirt to collect.

> **What made it hard:** the hinge only works if both screw holes share one axis and the lid notches match the posts. That's where the ±0.005 in tolerance mattered most, so both drawings dimension the hinge axis from the same back edge.

![Engineering drawing of the pen box base with recess, pen slot, hinge posts and clearance holes, plus an isometric view](../../assets/projects/machine-shop/dwg-box-base.png "Drawing: box base (6061-T6).")
![Engineering drawing of the plain pen box lid plate with corner notches and tapped hinge holes](../../assets/projects/machine-shop/dwg-box-lid.png "Drawing: lid, before engraving.")

### 3. Tic-tac-toe: two metals so the players can be told apart

![The board mid-game with brass and aluminum pegs standing in the grid](../../assets/projects/machine-shop/ttt-game.jpg "Mid-game: brass against aluminum.")
![The board with its ten pegs laid out beside it](../../assets/projects/machine-shop/ttt-layout.jpg "One milled board, ten turned pegs. Each end tray stores one player's set.")

My first project where parts had to fit each other.

- **Pegs** are turned with a shoulder and a locating pin, so they stand upright in a hole.
- **Countersunk holes** guide a peg in even when it's dropped off-centre.
- **Milled grid grooves**, so the lines can't wear off.

> **What made it hard:** any of ten pegs has to fit any of nineteen holes. That only works if every hole and every pin is held to one size, which is why the drawings give a single size for each.

![Engineering drawing of the tic-tac-toe board: 5.000 by 2.500, 19 countersunk holes, grid grooves, raised centre and two trays, with an isometric view](../../assets/projects/machine-shop/dwg-ttt-board.png "Drawing: board (6061-T6).")
![Engineering drawing of the tic-tac-toe peg: Ø.375 body, Ø.180 locating pin, chamfers](../../assets/projects/machine-shop/dwg-ttt-peg.png "Drawing: peg, 5 brass and 5 aluminum.")

### More drawings and CAD

![Assembly drawing of a chair with balloons and a bill of materials](../../assets/projects/machine-shop/dwg-chair.png "Six-part aluminum chair: I designed, drew (six sheets, exploded view, BOM), and machined it.")
![Orthographic drawing of a dovetail slide block](../../assets/projects/machine-shop/dwg-dovetail.png "Dovetail slide block in 4140 steel: 45° dovetail, counterbores, tolerance block.")

![Drawing of a cradle mount with auxiliary views](../../assets/projects/machine-shop/dwg-cradle.png "Cradle mount: auxiliary and section views for the angled faces.")
![Drawing of a slider clamp](../../assets/projects/machine-shop/dwg-clamp.png "Slider clamp: slot, counterbore, and thread callouts.")

![CAD model of a wind turbine with helical blades](../../assets/projects/machine-shop/cad-turbine.png "Self-directed: one blade swept along a helix, then patterned, so editing one updates all.")
![CAD model of an AC generator with two magnets, a coil, and a shaft](../../assets/projects/machine-shop/cad-generator.png "Self-directed: twelve-part AC generator model for a physics project.")

## Results

Every part was machined from its drawing. The pen comes apart for refills, the box lid swings on its built-in hinge and sits flush, and any peg fits any hole. Five things didn't come out the way I drew them, listed below.

## What I learned

Most of what I know about tolerances came from a part not matching its drawing, and working out why.

| Defect | What happened | Next time |
| --- | --- | --- |
| Refill sticks out too far | I drilled the tip's refill bore past its target depth. | Set the quill stop, drill short, and test-fit before final depth. |
| Hinge screws bind | The tap didn't run true, so the threads came out tight and off-axis. | Spot drill, confirm the tap drill size, and guide the tap from the spindle. |
| Rough box pocket | Heat built up at the cutter, so the finish needed a lot of hand polishing. | Cutting fluid, lighter passes, and a shallow finishing pass. |
| Notch in the board corner | I turned a handwheel the wrong way and the cutter nicked a corner. | Check direction with the cutter clear, and set table stops on finishing passes. |
| Uneven board chamfers | Filed by hand at an inconsistent angle, so the edges came out rounded. | Cut chamfers on the mill with a chamfer tool. |
