---
sidebar_label: PID and Motion Profiling
sidebar_position: 1
---

# PID and Motion Profiling

---

### PID

PID stands for proportional-integral-derivative. It's a form of closed loop control, and that's basically all I feel like explaining it. [Here's a nice article that explains it much better than I ever will](https://docs.wpilib.org/pt/latest/docs/software/advanced-controls/introduction/index.html). There was a very useful video on that page but for some reason it's now private.

### Motion Profiling

Motion Profiling, aka Path Planning is a way to make the robot accurately follow preplanned paths, and this is mostly used for games which have an autonomous section. I really don't feel like explaning it and to be honest I don't really know much about motion profiling, so just follow the guide on the [WPILib website](https://docs.wpilib.org/en/latest/docs/software/pathplanning/index.html).

One of the things to remember when doing motion profiling is that when you do get the PID parameters from the Robot charectarizer, you can program them into the Talon SRX motor controller instead of running the PID loop on the RoboRIO. Though this is much more complicated to do, it might yeild better performance. However, if and when you do motion profiling, getting it working should be the first priority, and only after you have properly working motion profiling do you focus on moving the PID processing to the Talon SRXs(Talon SRX is one of the advanced motor controllers that is connected through the CAN bus).
