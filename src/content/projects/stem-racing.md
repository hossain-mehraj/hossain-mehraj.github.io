---
title: "STEM Racing: Engineering"
slug: stem-racing
summary: "Designing and machining Team Lux's CO₂ race car, 4th in Canada."
icon: car
thumbnail: ../../assets/projects/stem-racing/thumb.jpg
tags: [CAD, CFD, Manufacturing]
role: Design & Manufacturing Lead
dates: Nov 2025 – Apr 2026
featured: true
order: 1
heroImage: ../../assets/projects/stem-racing/render-exploded.jpg
heroAlt: Exploded render of the Team Lux car showing the body, front and rear wings, halo, wheels, and bearings separated in space
heroCaption: Exploded view of the final Nationals car.
team: 6 members and 3 helpers (Team Lux)
tools: [Onshape, Fusion 360, Ansys Discovery, Ansys Fluent]
stats:
  - { value: "4th", label: "in Canada, out of 12 national finalist teams" }
  - { value: "49%", label: "cut in simulated drag, 0.45 N to 0.229 N" }
  - { value: "< 0.025 mm", label: "machined ridge height on aero surfaces" }
  - { value: "4 cars", label: "built and raced across the season" }
links: {}
---

## Overview

STEM Racing (formerly F1 in Schools) asks student teams to design, build, and race a CO₂-powered car inside a tight rulebook. Team Lux formed two weeks before Regionals, qualified, and finished 4th at Nationals, about 10 points out of 1,000 short of the international final. I led the car's design and manufacturing.

The business side (sponsorship, scheduling, and the enterprise awards) has its own page: [STEM Racing: Enterprise](/projects/stem-racing-enterprise/).

## The goal

With almost no track time, the car had to be developed in simulation. Every change was checked in CFD before it was machined, against four targets: drag coefficient (C<sub>d</sub>), frontal area, rolling resistance, and the gap between the centre of mass and the centre of pressure.

## What I did

- Led the aerodynamic and mechanical design in Onshape and Fusion 360.
- Ran the CFD workflow in Ansys Discovery and Ansys Fluent, with mentorship from KM Aero on reading the results.
- Planned the machining process and moved production from 5-axis to a 3-axis vacuum-table router.
- Chose the materials for every 3D-printed part, and produced the drawings and renders for the design portfolio.

## Process

### CFD: screen fast, then measure

New shapes were screened in Ansys Discovery's real-time solver. Only the ones that survived went to Ansys Fluent for a steady-state RANS run: a half car on a symmetry plane, 25 m/s freestream over a moving floor, an 80 m/s CO₂ jet, and wheels spinning at track speed (Reynolds number about 374,000).

![Simplified car in the fluid domain with arrows marking the freestream, moving floor, CO₂ jet and wheel rotation](../../assets/projects/stem-racing/cfd-boundary-conditions.jpg "Boundary conditions: freestream, moving floor, CO₂ jet, and rotating wheels.")
![Polyhedral mesh of the fluid domain, finer near the car](../../assets/projects/stem-racing/sr-cfd-mesh.jpg "Mesh, refined near the car surface and wheels.")

### Baseline: finding where the energy went

We built one deliberately simple car and studied it before designing the real one. It made **0.64 N of drag (C<sub>d</sub> = 0.167)** and showed four problems: energy lost at the front-wing junctions, front-wheel wake pulled under the floor, separated flow off the sidepods re-entering the floor, and a late, weak diffuser. Each later change targeted one of these, so we always knew which change caused which result.

![Velocity plot under the floor of the car with a circled region of disturbed flow](../../assets/projects/stem-racing/sr-cfd-underfloor.jpg "Underfloor velocity. The circled region is misaligned flow entering the floor.")
![Blue surfaces around the car marking regions of total pressure loss](../../assets/projects/stem-racing/sr-cfd-loss.jpg "Regions of total pressure loss.")

### Iterations: first race car to final car

The first race car, the prototype, before any of the CFD-driven changes below:

![The prototype Team Lux race car on a workbench: pale machined foam body, grey 3D-printed wings and wheels, red halo](../../assets/projects/stem-racing/sr-car.jpg "Prototype: the first race car, with a CNC-machined foam body and 3D-printed wings, wheels, and halo.")
![The prototype car on the start line under the timing gate](../../assets/projects/stem-racing/sr-startline.jpg "Test session: the prototype on the start line.")

![CAD render of the first front wing with a high-downforce profile](../../assets/projects/stem-racing/front-wing-v1.jpg "Front wing, first race.")
![CAD render of the final front wing with refined endplates](../../assets/projects/stem-racing/front-wing-v3.jpg "Front wing, Nationals.")

![CAD model of the first body iteration](../../assets/projects/stem-racing/sr-cad-body-c.jpg "Body, first race.")
![CAD model of the final body iteration](../../assets/projects/stem-racing/sr-cad-body-a.jpg "Body, Nationals.")

- **Front wing.** From a high-downforce profile to a neutral one, with endplates reshaped to push wheel wake around the tyres instead of under the floor.
- **Rear wing.** From a flat plate to a supported wing tuned for downforce against drag.
- **Sidepods.** Aggressive scoops separated at their sharp edges and were hard to machine, so the final version is a smooth taper that keeps flow attached.
- **Body.** A trimmed nose cut frontal area, and fully rounded edges gave a teardrop shape with a small wake. I checked every surface with zebra striping before meshing.

Under identical conditions, drag fell from **0.45 N to 0.229 N**.

![Top-view velocity field around the final car](../../assets/projects/stem-racing/sr-cfd-final-top.jpg "Final car from above. The front-wing outwash steers flow around the wheels.")

### Wheels: removing the axle

The first car ran a rod through the body, which needed clearance channels (more frontal area) and slow alignment at the track. The final car has no axle: each SLS-printed wheel holds a bearing in a toleranced pocket, retained by matching recesses in the chassis mount, and the wheel has an airfoil cross-section to cut spinning drag.

![CAD of the first car with axle rods through the body](../../assets/projects/stem-racing/sr-cad-rolling.jpg "Before: through-axles.")
![CAD of a pair of wheels with integrated bearing mounts](../../assets/projects/stem-racing/sr-cad-wheel.jpg "After: bearing-retained wheels.")

### Manufacturing: why we dropped 5-axis

CAM simulation pointed to 5-axis machining, but the tooling foam distorted under clamps, fixtures blocked toolpaths, and the rotary axes added error. Since every body must come from its own regulation block, we switched to a 3-axis router with a vacuum table and cut each body from four sides: trochoidal roughing, rest machining with small ball-nose cutters, then finishing passes along the flow direction that left ridges under 0.025 mm.

Printed parts: PLA and PETG for form studies, SLA resin for low-friction surfaces, and carbon-fibre-filled filament for high-stress parts.

![CNC router machining three foam car bodies, each from its own block](../../assets/projects/stem-racing/sr-cnc-a.jpg "Three bodies in one run, each from its own regulation block.")
![Close-up of a machined foam body showing the CO₂ cartridge bore](../../assets/projects/stem-racing/sr-cnc-close.jpg "Machined body and cartridge bore before finishing.")

## Results

Four cars across the season, ending with two matched cars for Nationals. Simulated drag was 49% lower than the first race design, and we placed **4th overall in Canada**.

![Three-quarter render of the final car from above and behind](../../assets/projects/stem-racing/render-three-quarter.jpg "Final car, rendered.")

![Team Lux's gold race car in the start box beside the start gate, with the F1 in Schools logo on its screen](../../assets/projects/stem-racing/sr-nationals-gate.jpg "In the start box at Nationals.")
![The gold Team Lux car and an opposing purple car on the track under the start gate](../../assets/projects/stem-racing/sr-nationals-start.jpg "Team Lux (gold, left) on the start gate at Nationals.")

## What I learned

| Issue | What happened | Next time |
| --- | --- | --- |
| First design had twice the drag | Drawn before we had studied the flow. CFD later traced its 0.45 N to a blunt nose, wheel wake under the floor, and a separating diffuser. | Run a baseline flow study before committing to a design. |
| Sidepod scoops separated | Sharp edges caused separation and were hard to machine consistently. | Check machinability alongside each CFD result. |
| Through-axle added drag | Clearance channels added frontal area and setup time. | Design wheel mounting together with the body. |
| 5-axis failed on foam | Clamping distorted the foam, so parts varied more, not less. | Cut a test piece in the real material before committing to a process. |
| Little track testing | Joining late left few timed runs to check the CFD. | Schedule timed runs for every car version. |

