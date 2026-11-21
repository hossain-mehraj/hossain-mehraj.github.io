---
title: "STEM Racing: Team Lux"
slug: stem-racing
summary: "CO₂ race car, 4th in Canada: the engineering and the business."
icon: car
thumbnail: ../../assets/projects/stem-racing/thumb.jpg
tags: [CAD, CFD, Business]
role: Design & Manufacturing Lead; Operations & Sponsorship
dates: Nov 2025 – Apr 2026
featured: true
order: 1
heroImage: ../../assets/projects/stem-racing/render-exploded.jpg
heroAlt: Exploded render of the Team Lux car showing the body, front and rear wings, halo, wheels, and bearings separated in space
team: 6 members and 3 helpers (Team Lux)
links: {}
tabs:
  - id: engineering
    label: Engineering
    role: Design & Manufacturing Lead
    tools: [Onshape, Fusion 360, Ansys Discovery, Ansys Fluent]
    heroImage: ../../assets/projects/stem-racing/render-exploded.jpg
    heroAlt: Exploded render of the Team Lux car showing the body, front and rear wings, halo, wheels, and bearings separated in space
    heroCaption: Exploded view of the final Nationals car.
    stats:
      - { value: "4th", label: "in Canada, out of 12 national finalist teams" }
      - { value: "49%", label: "cut in simulated drag, 0.45 N to 0.229 N" }
      - { value: "< 0.025 mm", label: "machined ridge height on aero surfaces" }
      - { value: "4 cars", label: "built and raced across the season" }
  - id: enterprise
    label: Enterprise
    role: Operations & Sponsorship Lead
    tools: [Gantt chart, WBS, RACI matrix, Risk register, Stakeholder register, Mail Suite]
    heroImage: ../../assets/projects/stem-racing/team-apparel.jpg
    heroAlt: Front and back of the black Team Lux race jersey with gold lighthouse logo and sponsor marks
    heroCaption: Team Lux race jerseys, with sponsor placement by tier.
    stats:
      - { value: "$11,600", label: "raised: $4,000 cash and $7,600 in kind" }
      - { value: "15+", label: "sponsors, from a list of 1,000+ companies" }
      - { value: "1st", label: "Best Pit Display, 2026 Nationals" }
      - { value: "2nd · 3rd", label: "Project Management · Brand Identity" }
---

<!-- tab: engineering -->

## Overview

STEM Racing (formerly F1 in Schools) asks student teams to design, build, and race a CO₂-powered car inside a tight rulebook. Team Lux formed two weeks before Regionals, qualified, and finished 4th at Nationals, about 10 points out of 1,000 short of the international final. I led the car's design and manufacturing.

The business side is under [Enterprise](#enterprise).

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

![The car on the start line under the timing gate](../../assets/projects/stem-racing/sr-startline.jpg "On the start line at Nationals.")
![The finished Team Lux race car on a workbench: pale machined foam body, grey 3D-printed wings and wheels, red halo](../../assets/projects/stem-racing/sr-car.jpg "The finished car: CNC-machined foam body, 3D-printed wings, wheels, and halo.")

## What I learned

| Issue | What happened | Next time |
| --- | --- | --- |
| First design had twice the drag | Drawn before we had studied the flow. CFD later traced its 0.45 N to a blunt nose, wheel wake under the floor, and a separating diffuser. | Run a baseline flow study before committing to a design. |
| Sidepod scoops separated | Sharp edges caused separation and were hard to machine consistently. | Check machinability alongside each CFD result. |
| Through-axle added drag | Clearance channels added frontal area and setup time. | Design wheel mounting together with the body. |
| 5-axis failed on foam | Clamping distorted the foam, so parts varied more, not less. | Cut a test piece in the real material before committing to a process. |
| Little track testing | Joining late left few timed runs to check the CFD. | Schedule timed runs for every car version. |

<!-- tab: enterprise -->

## Overview

STEM Racing is judged on more than lap times: teams also submit an enterprise portfolio, a presentation, and a pit display, scored on project management, sponsorship, and brand. This is how we funded, scheduled, and ran a team that started two weeks behind everyone else.

The car itself is under [Engineering](#engineering).

## The goal

Plan the season so six members and three helpers could work in parallel without waiting on each other, and fund about $11,900 from nothing. The charter fixed the deliverables: two track-ready cars, two 10-page portfolios, a 10-minute presentation, and a zero-waste pit display.

## What I did

- Ran operations: project charters, work breakdown, schedule, risk register, and budget.
- Built the sponsorship outreach system and handled a large share of sponsor contact myself.
- Kept the stakeholder register and milestone check-ins with every sponsor.

## Process

### Planning: scope, schedule, owners

Four work streams (Car Development, Enterprise, Branding, Competition), each broken into tasks with an owner and acceptance criteria. A shared Gantt chart ran from November to Nationals, with Regionals and Test Day as checkpoints, and a RACI matrix gave every deliverable exactly one accountable owner. Weekly one-hour meetings and written status reports kept everyone on the same plan.

![Work breakdown structure: Team Lux project split into Car Development, Enterprise, Branding and Competition, each with three tasks](../../assets/projects/stem-racing/work-breakdown.jpg "Work breakdown structure.")

![Gantt chart with eight phases from research and planning in November to final preparation in April](../../assets/projects/stem-racing/gantt.jpg "Season timeline: four cars across eight phases.")
![RACI matrix assigning responsible, accountable, consulted and informed roles for each deliverable](../../assets/projects/stem-racing/raci-matrix.png "RACI matrix: one accountable owner per deliverable.")

### Risk register

Nine risks rated by likelihood and impact. The top two, manufacturing delays and damage to the final car, both rated 8, so we started machining early, kept buffer time, and built duplicate cars and spare parts.

It was tested once: a rules mix-up ruined a regulation foam block with no spare in stock. Our title sponsor, GH Precision, sourced a replacement the same day, and we were cutting again within hours.

![Risk register table of nine risks with ratings from 5 to 8 and preventative measures](../../assets/projects/stem-racing/risk-register.jpg "Risk register.")

### Sponsorship: offering value, not asking for money

- **Outreach.** 1,000+ companies split across the team: cold call, follow-up, sponsorship package, then regular contact.
- **In-kind first.** Many companies couldn't give money but could give machining, printing, or expertise, which cut our projected cash budget from over $14,000 to about $2,000.
- **Return for sponsors.** Placement on the car, jerseys, and pit display, plus social posts and website visibility.

The result: $4,000 in cash and $7,600 in kind from more than 15 sponsors, plus software and CFD mentorship.

![Bar chart: projected project cost of over 14,000 dollars before in-kind sponsorship and about 2,000 dollars after](../../assets/projects/stem-racing/in-kind-impact.jpg "Projected cost before and after in-kind sponsorship.")
![Team Lux sponsorship package, website sponsor tiers and Instagram sponsor posts on laptop and phone mockups](../../assets/projects/stem-racing/sponsorship-materials.jpg "Sponsorship package, website tiers, and sponsor posts.")

### Brand

The name comes from our school motto, *Lux numquam desit* ("the light will never fail"), and the Port Credit lighthouse; the palette is black and gold. We grew a verified Instagram to 300+ followers and promoted every sponsor there.

![Team Lux colour palette: black 000000, gold B6995B, light gold E1DA86](../../assets/projects/stem-racing/colour-palette.jpg "Colour palette.")
![Team Lux Instagram profile, insights showing 13.2k views, website and posts on device mockups](../../assets/projects/stem-racing/digital-marketing.jpg "Instagram, website, and reach.")

## Results

At the 2026 National Championships: **1st in Pit Display**, **2nd in Project Management**, **3rd in Brand Identity**, and **4th overall**. Every deliverable was on time. The zero-waste pit display was built from repurposed workshop materials, and the lighthouse at the back is a model I designed and 3D printed.

![Plaque reading 2026 National Championships Best Pit Display](../../assets/projects/stem-racing/sr-plaque.jpg "Best Pit Display, 2026.")
![Team Lux pit display with design panels and a lighthouse model](../../assets/projects/stem-racing/sr-pit.jpg "The pit display, with the printed lighthouse at back left.")

## What I learned

On a short timeline the plan has to be visible: a chart everyone can see lets people pick up the next task without asking.

| Area | What happened | Next time |
| --- | --- | --- |
| Ruined block, no spare | Production stopped until a sponsor sourced a replacement. | Keep a spare block, and check each setup against the rules before cutting. |
| Compressed timeline | Little buffer was left between testing and final production. | More buffer between milestones; start final prep earlier. |
| Communication gaps | Scheduling conflicts cut full-team meetings in busy periods. | Structured check-ins and one shared place for status. |
| Local reach | Marketing reached mostly our school and community. | Expand to more platforms and a broader audience. |
