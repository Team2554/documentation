---
sidebar_label: Intro
sidebar_position: 1
---

# Programming Intro

---

### What does the programming subteam do?

#### Programming the RoboRIO

The programming subteam is responsible for writing Java code that runs on the RoboRIO. The RoboRIO is one of the most crucial parts of a FRC robot, and it contains a micrpocessor along with several input/output pins used for controlling different parts of the robot.

As a member on the programming team, you will be responsible for writing the code to control different parts of the robot, such as the drivetrain or a claw, and also integrating that code with controller inputs.

In order to do this, you will use the [WPILib Library](https://docs.wpilib.org/en/stable/), which contains everything you need to interface with anything that will be connected to the RoboRIO, such as motors and sensors.

#### Programming the Coprocessors

In addition to writing code that runs on the RoboRIO, you will also occasionally need to write code that runs on coprocessors such as a Raspberry Pi or a Jetson. These coprocessors are also situated on the robot, and communicate with the RoboRIO through ethernet and a library called [NetworkTables](https://docs.wpilib.org/en/stable/docs/software/networktables/networktables-intro.html).

Coprocessors are used to perform computationally heavy tasks that are not ideal to run on the RoboRIO. In Team 2554, we use a coprocessor for computer vision tasks, such as finding and targeting vision targets, using the [OpenCV](https://opencv.org/) library.

Coprocessor code is written in Python as it is easy to use OpenCV in Python, but C++ or Java can also be used.

#### Miscellaneous Tasks

In addition to programming the robot, the programming subteam is also responsible for a few miscellaneous tasks, such as imaging and/or updating the firmware of the RoboRIO, the WiFi radio, and some motor controllers.
