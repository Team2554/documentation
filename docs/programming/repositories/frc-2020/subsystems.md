---
sidebar_label: Subsystems
sidebar_position: 2
---

# Subsystems

### DriveTrain
This is probably the most important subsystem on the entire robot. It is responsible for controlling all the movement of the robot, and includes some helper functions useful for motion planning in autonomous mode.

The robot's drivetrain is known as a differential drivetrain, and it performs similarly to a tank. It has wheels on each side, and to go forward, both sides go forward. To rotate to the right, the left side goes forward, and the right side goes backward, and you get the idea.

The physical drivetrain on our robot has two motors on each side, connected to a gearbox which combines their power and connects them to the center wheel on that side. The center wheel is connected through a belt to the front and the back wheels.

One of the motors on each side is controlled by a Talon SRX and the other one is controlled by a Victor SPX. This is so that any of the advanced computation(such as PID loops) can be done on the Talon SRX, and the Victor SPX can be set to just follow the Talon. The Victor SPX is not capable of performing any advanced computation.

The drivetrain also contains a magnetic rotary encoder on each side to measure the distance travelled by each side of the robot. This encoder is wired to the Talon SRX, which as a port on it to connect to special accesories. The `SRXMagEncoder_Relative` wrapper from the `custom` folder is used to read data from the encode.

The robot also contains a Pigeon IMU. An IMU is an **I**nertial **M**easurement **U**nit, and it contains an accelerometer, magnetometer, and gyroscope. We are using it to get accurate rotational data of the robot.

The DriveTrain class inherits from the SubsystemBase class, which is an internal class in the WPILib library. This is the base class for all subsystems, and in the DriveTrain class, we override some of it's methods, which we will see later. For now, let's take a look at all the instance variables that we initialize:

 - `talonRight`, type `WPI_TalonSRX`, the right Talon SRX. We are using the `WPI_` version because the `WPI_` version inherits from the WPILib `SpeedController` class, which we are going to need it to do if we want to use it with WPILib's `DifferentialDrive` class, which we will see later.
 - `victorRight`, type `VictorSPX`, the right Victor SPX that is supossed follow the right Talon SRX. This is not the `WPI_` version because we don't need to use it with differential drive. Only the Talon is used with differential drive, and later, we are going to set the Victor SPX to automatically follow the Talon SRX.
 - `talonLeft` and `victorLeft`, the same thing as `talonRight` and `victorRight` respectively.
 - `rightEncoder`, type `SRXMagEncoder_Relative`, the rotary encoder connected to the right side of the drivetrain, using the convienince class from the `custom` folder.
 - `leftEncoder`, same thing as `rightEncoder`
 - `driveTrain`, type `DifferentialDrive`, Differential drive is a WPILib class that contains many convinience functions that allow us to easily control a differential drivetrain. As the parameters, we pass it `talonLeft` and `talonRight`(note that we woudln't be able to do this if the Talons weren't `WPI_` type)
 - `pigeonIMU`, type `PigeonIMU`, the object to get data from the Pigeon IMU.
 - `maxVoltage`, type `double`, the maximum voltage to run the TalonSRX's on.
 - `odometry`, type `DifferentialDriveOdometry`, a WPILib class used to keep track of the robot's position and rotation, useful when we do path planning and motion profiling. We'll see how the objetct's data is updated later.
 - `leftPIDController` and `rightPIDController`, type `PIDController`, the PID controllers for each side of the drivetrain. Not really used right now. I think they could be useful for motion profiling, but I have no idea. You're gonna have to read the motion profiling tutorial on WPILib to see how that works.
 - `isInverted`, type `bool`, a variable to keep track of if the driver wants to drive the robot in reverse or not. I don't remember why this is useful.
 - `gyroTimestamps` and `gyroAngles`, type `List<Double>`, are lists to keep track of the last 100 gyro values, and the time that those values were recorded. This exists because, when using the gyroscope to match the data from the vision camera, they both might be out of sync(in terms of time), so we want to get the data point closest in time to the data point from the vision camera, which the `getClosestAngle` function does.

Now let's go through the constructor. `setRightSideInverted` is by default true, and it's set to false because sometimes people have motors that run the opposite direction on the right side. In the case of our robot, we didn't, but if it turns out we did, just set this to true.

Next, we reset all the options on all the motor controllers to default.

Next, we set the NeutralMode for all the motors to Brake. What this means is that if we have no input to the motor controllers, they will apply brakes on the motors. They do this by basically shorting the motor leads, so that the motors basically absorb all the power that is applied at them. This is so that, when we do PID related stuff, the motor comes to a stop when we want it to, and it doesn't just keep rolling after we stop applying power. This is equivalent to regenerative braking on electric cars, except the extra energy doesn't go into the battery, but it's just dissipated as heat. And before you even think of it, there's no point in having regenerative braking on FRC robots. The battery lasts through each round, and we switch out batteries every round.

Next, we enable voltage compensation on the motor controllers. This is because the battery voltage is not always consistent. I.e., the voltage on a fully charged battery has a higher voltage(somwhere around ~13 volts), compared to a battery on the lower end of charge(somwhere around ~11 volts). We want the motor output to be consistent among battery levels, so we set the motor controller to automatically compensate for battery voltage. This is one of the many features that the Talon SRX offers. We set the peak voltage of the motor to be 10 volts(remember `maxVoltage`?), so if we tell the motor controller to apply full power, it keeps the motor voltage at 10 volts. The number is set to 10 volts so that it's max performance is consistent among battery levels.

Next, we set the the Victor SPXs to follow the Talon SRXs. We also set the motors on the right side to be inverted(I'm pretty sure this is why we run `driveTrain.setRightSideInverted(false)`). If you find that the gearbox on any side keeps locking up while applying power, it means that one of the motor controllers on that side needs to be inverted or uninverted. If the robot spins when you tell it to go forward, then, depending on which way it spins, invert the `setInverted` values(true to false, false to true) on an entire side of the drivetrain <sub>or, you could also just blame the problem on electrical and tell them to adjust the wiring to be consistent with your code.</sub>

Next, we set the wheel diameters for the encoders(refer to the intro doc to see what this means)
Then we run the `.configure()` on the encoders(again, check that part of the documentation to see what that means)

Finally, we reset the encoders and gyros(this sets the encoder reading to 0 distanceUnits, and the gyro reading to 0 degrees)

Next, there's the `getWheelSpeeds()` function, which I believe is useful for motion profiling.

Then there's the `getLeftPIDController()` and `getRightPIDController()` functions. I honestly have no idea why these exist, even though I probably wrote this code, I think they're probably useful for motion profiling.

Then there's `curvatureDrive()`, which is a simple wrapper of the `driveTrain` object's curvature drive function. This is just a neat way to map joystick axes to the differential drive in a way which makes it easy to drive. Also, I don't remember exactly what `isQuickTurn` does, I'm pretty sure it just makes the robot turn faster in exchange for a slower speed.

Then there's `tankDriveVolts()`. Pretty sure this is there for motionProfiling, but it could also be used to drive the robot with two joysticks(one controlling each side).

Then there's `resetEncoders()`, which we called in the constructor, and this just calls the `reset()` method of each of the encoders.

Then there's `getAverageEncoderDistance()`, which averages the values of the two encoders and returns them. Same goes for `getAverageEncoderVelocity()`. Remember, an encoder measures distance, so it can also measure velocity, as velocity is just distance over time. I don't remember why these functions exist, probably just for motion profiling.

Then there's `resetGyro()`, which resets the gyroscope by setting the yaw of the IMU to 0.

Then there's `resetOdometry()`, which resets the encoders and sets the stored position and rotation of the robot(`Pose2d`) to it's starting position. `Pose2d` is just a class in WPILib used to store position and rotation.

Then there's `getHeading()`, which has been used multiple times in this program, and returns the yaw from the IMU and modulo's it by 360. I honestly don't remember why we use IEEERemaineder, I think it's because it supports negative numbers or something.

The `getClosestAngle()` function basically returns whichever one of the logged angles and timestamps is closest to the timestamp supplied. This is used in one of the vision commands used to auto-target the vision target. The algorithm for this function is pretty simple.

The `periodic()` functions exists in all subsystems, and is an override of the `SubsystemBase` superclass. In the periodic function, we update `odometry` with the encoder values, put the heading and speed on SmartDashboard, and record the gyro value and timestamp to their respective lists.

Then there's `getPose()`, which returns the current pose from the `odometry` object. This isn't used anywhere yet, but it's probably useful for motion profiling or something.

Last and absolutely the least, there's `inverseInput`, which just inverts the `isInverted` property. This function isn't referenced anywhere in the code and I'm honestly not sure why it exists.
