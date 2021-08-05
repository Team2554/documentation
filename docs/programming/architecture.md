---
sidebar_label: Architecture
sidebar_position: 2
---

# Architecture

---

#### Network Architecture

The RoboRIO is like the brain of the robot. It's the central point for all input/output for the robot. The RoboRIO is connected to a radio through Ethernet, which usually acts as a wireless access point, but can also connect to another AP, which is usually done at competitions.

The coprocessor(Raspberry Pi or Jetson) is also attached to the radio through Ethernet.

While not at competitions, the driver station computer connects to the AP created by the robot radio, and an application on the driver station computer allows the driver to send control inputs to the RoboRIO. At competitions, the driver station is connected to an ethernet port, and the field computer does some weird networking magic to link it to the robot.

Like described before, the NetworkTables library can be used to communicate between devices connected to the robot radio.

NetworkTables is also used to transmit data back to the driver station. Information such as sensor data and other diagnostic data can be sent this way.

More information on software components can be found [here](https://docs.wpilib.org/en/stable/docs/controls-overviews/control-system-software.html). You can ignore LabView, LiveWindow, the Log Viewer, RobotBuilder, Robot Simulator, Outline Viewer, and the Axis Camera. We never have and never will use those. You do not need to worry about PathWeaver and Robot Charectarization yet, those will come up later.

#### Hardware Architecture

Motor controllers are connected to the RoboRIO through a variety of connectors. Basic motor controllers are connected through PWM pins. PWM is a way of encoding analog signals as digital signals, and it basically allows the RoboRIO to send a 0-100% number to the motor controller. More info on PWM [here](https://www.arduino.cc/en/Tutorial/Foundations/PWM).

More advanced motor controllers are connected through the CAN bus. The CAN bus is an interface which allows connected multiple devices over only 2 wires, and allows commands to be sent to each device induvidually. Some of our advanced motor controllers are connected throuh the CAN bus. Whatever the connection, the basic code to control the motor controllers is the same. However, using the CAN bus allows for more advanced features, such as running PID loops onboard a motor controller. More on PID later.

Most commons sensors will have a class in the WPILib library for easy control. Basic sensors are connected through the digital input/output ports. More advanced sensors might sometimes use the I<sup>2</sup>C interface.

Some years, we also use pneumatics. Pneumatic solenoids are connected to a Pneumatic Control Module, which is in turn connected to the RoboRIO through the CAN bus. WPILib has easy to use libraries to control solenoids and other pneumatic-related devices.

Here's a wiring diagram that shows how everything is connected. Focus on the wires that are used for signaling. You can ignore the power cables, those are the electrical team's problem:
<img src="https://docs.wpilib.org/en/stable/_images/frc-control-system-layout.svg" style={{backgroundColor: '#ffffff80'}}></img>

#### RoboRIO Code Architecture

In Team 2554, we used the command-based programming architecture in RoboRIO. All the information about command-baed programming can be found [here](https://docs.wpilib.org/en/stable/docs/software/commandbased/index.html). Read all of the links on that page.
