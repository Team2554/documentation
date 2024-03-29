---
sidebar_label: Deep Space Documentation
sidebar_position: 2
---

# Deep Space Documentation

**_FRC 2019 - Competition Documentation_**

<hr/>

## Tasks

- Shoot balls into different bins/cargo ships
- Shoot balls into openings in vertically placed rockets
- Place hatches on the rocket openings so more balls can be stacked inside the rocket
- End Game - Climbing task with 2 levels (See Actuator section below)

---

## Robot Pictures

<img src="/img/mechanical/deep-space/image1.png" width="300"/>
<img src="/img/mechanical/deep-space/image2.png" width="450"/>

## Robot Documentation

<hr/>

## Drive Train

- Mecanum drive train from kit bot adjusted to remove top layer of extruded aluminum to mount the shooter and actuators

## Intake/Output/Shooter

1. Original Shooter

   1. 2 Wheels on both sides, lined up side by side and linked by a chain, on the bottom of the metal bar
   2. Motor was on top of the metal bar, with a hole cut into the metal for the motor to fit.
   3. We had two arms like this on the shooter, one on each side. The wheels were linked by a chain, meaning both the wheel directly connected to the motor and the one not connected would rotate at the same rate.
   4. Pieces of acrylic were used to create a curved holder for the balls. One was attached to the inner side of each arm.
   5. The guard shown at the top was located on the outer side of each arm and made of plexiglass.
   6. Both the acrylic and plexiglass were shaped and bent using a heat gun. ![drawing](/img/mechanical/deep-space/image3.png)

2. Changed Shooter

   1. The 2 wheels were vertically aligned rather than bound by a chain.
   2. One wheel on top of the bar, one on the bottom, linked by an axle.
   3. Motor remained on top.

      ![drawing](/img/mechanical/deep-space/image11.png)

3. Final Shooter

   1. One wheel on each side, rather than two
   2. Guards changed to bent pieces of metal
   3. Material removed from the end to create a thin sheet
      ![drawing](/img/mechanical/deep-space/image4.png)

4. Actuator Mechanism on Shooter

   1. After the shooter mechanism intakes a ball, the ball rests on the plate of the actuator without touching the wheels of the shooter
   2. When shooting the ball, the actuator is extended to push the ball back into the wheels
      ![drawing](/img/mechanical/deep-space/image5.png)

5. Usage
   1. At the beginning of each round, the hinge is lowered down as much as possible
   2. The robot moves to intake a ball with the shooter
   3. When the robot moves to the area to score, it raises the hinge to the proper angle
   4. The actuator is extended to launch the ball
   5. [Usage of Shooter](https://drive.google.com/file/d/1IrHA1J7CzK5Hf-GdQXEFkW_3aWTjqtrX/view?usp=sharing) (Includes usage of hinge)

## Claw

1. Design utilized an actuator with a wedge attached to the end.
2. Medical Tubing was used to create tension.
3. Usage
   1. When the actuator extended, the wedge would push between the two parts of the claw, bringing the ends apart. This would be done after the claw was inserted into the center of the hatch. Grooves in the outside of the arms would grab onto the inner rim of the hatch and keep it secure. After bringing it over to one of the rockets, retracting the actuator would allow the claws to move inwards, letting go of the hatch and placing it on the rocket.
4. Attached to a freely swinging hinge. There was a lock on the hinge which would slide into a hole in one of the pieces of extruded aluminum. Lock would be removed at the beginning of each match, so that when the robot had enough sudden movement, the hinge would swing down and allow us to use the claw.
5. Design: **Ask Mr. Kearney for 3-d claw design**

## Shooter Hinge

1. Design
   1. Motor positioned on an elevated beam. The motor had an axle coming out, which had a strap starting from the shooter attached to it. Turning the motor in one direction would wind up the strap and pull up the shooter, while turning it in the other direction would gradually lower the shooter.
   2. Had to make sure the strap had a lot of tension, so that the shooter couldn’t randomly bounce around.
2. Purpose 3. Release intake/shooter mechanism after round starts to follow perimeter restrictions.
3. Issues 4. Awkward design made from washers and acrylic (which formed the hook which attached to the intake/shooter mechanism) 5. Caused damage to the aluminum of the shooter
4. Usage (See: “Intake/Output/Shooter” - Usage)

![drawing](/img/mechanical/deep-space/image6.png)

**Actuators**

1. Purpose
   1. Bottom of Actuators was an aluminum rod with free rolling Wheels attached to the actuators.
   2. Back Actuator had Seed Motor that was used to move back and forth when robot was off ground
2. Other Attempts:
   1. Pneumatics was attempted in small team and while mechanism was successful with regular robot, the eventual robot was too heavy to implement feasibly and thus scrapped
   2. Elevator idea was brought up but eventually
3. Actuators in Climbing + In-Game Implementation [Testing Actuators](https://drive.google.com/file/d/11GiTpIHZkdGXb14OJ4V5qQ_5p1tUAzML/view?usp=sharing)
   1. Approach level 1 platform
   2. Extend both actuators
   3. Power the wheels attached to the back actuator and go forward until the front of the robot is on top of the level 1 platform and the front actuator/set of wheels is close to said platform
   4. Retract front actuator
   5. Power the back wheels again and also the front set of main wheels so that the majority of the robot is on top of the level 1 platform
   6. Retract back actuator and use main wheels to completely bring the robot on to the platform
   7. For level 2 climb, repeat the same process, but after doing a ninety degree turn when on the level 1 climb

![drawing](/img/mechanical/deep-space/image7.png)

4. Actuators in Shooter
   1. There was an actuator placed at the back of the shooter
   2. Goal was not for the actuator to cause the ball’s motion, but rather to push the ball from the holding area into the wheels, where it would then be shot out

![drawing](/img/mechanical/deep-space/image8.png)

## Bracing + Misc.

1. Angled Braces
   1. Purpose
      1. Prevent the extruded aluminum bars holding the actuators that raise the robot from swaying
   2. Process of Creating
      1. Cut a piece of extruded aluminum at an angle with the miter saw on both ends to create the angle seen in the image below
      2. Process: [Cut top ends of the aluminum bar](https://drive.google.com/file/d/1G6EDl3IKU72lkpsEYgrRA-2MAE3WA3G9/view?usp=sharing) (which forms the brace) off to allow for space to attach the attachment to the aluminum bar (**see images below**)
      3. Drill a hole perpendicular to the aluminum bar being supported into the brace bar and attach with a bolt. To best drill this hole, do so from the inner side of the extruded, where the angled cut took place. The hole in the extruded will already be there for centering/guiding purposes, and it eliminates the concern of having to line it up.

<img src="/img/mechanical/deep-space/image9.png" width="275"/>
<img src="/img/mechanical/deep-space/image10.png" width="520"/>

2. Bracing between “Pillars”
   1. Purpose
   2. Prevent “pillars” from swaying as the robot moves
3. Plexi-Glass/Acrylic
   1. Plexi-glass used to cover E-Board to protect from metal shavings
   2. Plexi-glass panel on the side to show the names of sponsors
   3. Acrylic originally used in shooter-guards
   4. Acrylic used to form a holding zone for the ball between the actuator and wheels
