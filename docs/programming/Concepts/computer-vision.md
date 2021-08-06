---
sidebar_label: Computer Vision
sidebar_position: 2
---

# Computer Vision

---

import useThemeContext from "@theme/hooks/useThemeContext";

### Vision targets

Almost all games in FRC have vision targets at specific points on the field. Vision targets are pieces of retroreflective tapes. Normally, a surface either diffuses light or reflects it, and sometimes it does a bit of both. Here's a simple image demonstrating how reflection and diffusion works:

<img
src="https://dr282zn36sxxg.cloudfront.net/datastreams/f-d%3A972a9515d044564133494205449650e595ba218bdaa2a0ddfb539676%2BIMAGE_THUMB_POSTCARD_TINY%2BIMAGE_THUMB_POSTCARD_TINY.1"
style={{ filter: useThemeContext().isDarkTheme ? "invert(1)" : "invert(0)" }}></img>

Unlike either of these, retroreflective tape sends light rays right back to the source, and the tape is made of millions of tiny prisms that mimic the mechanism shown below:
<img
src="https://upload.wikimedia.org/wikipedia/commons/5/51/Corner_reflector.svg"
style={{ filter: useThemeContext().isDarkTheme ? "invert(1)" : "invert(0)" , width: '10rem'}}></img>

You can see retroreflection in action at a stop sign or even just your license plate. During night time, just go up to your license plate with a flashlight, and put the flashlight near your eye. You will see that the license plate becomes much brighter. This is an example of retroreflection.

In an FRC game, these vision targets are attached at important parts of a field, usually in places where game objects are deposited. Here's an example of a vision target from the Infinite Recharge game(this image comes from the game manual)
<img src="/img/programming/concepts/vision/vision-target-1.png" width="500"></img>

and another from the deep space game:
<img src="/img/programming/concepts/vision/vision-target-2.png" width="500"></img>

### Identifying the target

In order to identify the target, we need a camera and a light to illuminate the vision target. Currently, we use a logitech camera and a green LED ring stuck to the camera with double sided tape. The LED is green so that the target looks green in the camera. Green isn't a color that commonly appears on an FRC field, so this allows us to more easily isolate the vision target.

When it comes to actually isolating the vision target from camera frames, we use a library called OpenCV. In order to make writing OpenCV code easier, we use an application called [GRIP](https://github.com/WPIRoboticsProjects/GRIP), which allows us to build vision pipelines graphically, and then automatically generate the OpenCV code needed to run the pipeline. GRIP can be downloaded [here](https://github.com/WPIRoboticsProjects/GRIP/releases)(Download the one marked "Latest Release" and not any of the pre-releases).

In order to learn how to use GRIP, we will be working with this sample image:
![](/img/programming/concepts/vision/GRIP-vision-target.png)
Right click and save this image, and install GRIP to follow this example.

1. Open GRIP
1. Click on `Add Source` and select `Image(s)`.
1. Select your image
1. Click on the eye icon on the input source to see the image
1. Now, we're ready to start building the pipeline
1. For the first step in the pipeline, we are going to add a HSV treshold. Use the search box on the top right panel to look for `HSV Treshold`.
   - HSV is a way of representing colors with three numbers. Normally, you would represent colors with RGB, which defines how much of each(red, green, and blue) is in a certain color. HSV, on the other hand, defines a color by hue, saturation, and value. HSV is not to be confused with HSL, which is a very stupid way of representing color and should never be used. In order to understand how HSV works, search up color picker on Google and tweak with it to see how the numbers change. You can see that the color slider corresponds with hue, the horizontal axis on the box corresponds with saturation, and the vertical axis corresponds with value.
1. Click on HSV treshold in the top right panel to add it to the pipeline.
1. Click on the eye icon on HSV treshold to show a preview of it's output.
1. Drag the image circle from the source into the input circle of the HSV treshold.
1. Drag the sliders on the HSV treshold until you isolate just the vision target.
1. Your setup should look something like this after you are done:![](/img/programming/concepts/vision/grip-1.png)
1. After we've isolated the vision target, we need to find the center of it. For this, we will use contours.
   - Contours are just a series of points which define a polygon. OpenCV has a `Find Contours` function which we can use to find shapes in an image.
1. Search for `Find Contours`, and add it to the pipeline.
1. Drag the output of the HSV treshold to the input of Find Contours.
1. Check the `External Only` checkbox so that we don't get contours inside contours.
1. Search for `Filter Contours` and add it to the pipeline. This will allow us to remove any invalid contours.
1. Set the `Max Width` and `Max Height` to extremely large numbers(something like 99999).
1. Increase `Min Area` until all the small contours dissapear.

   - When you are actually performing this step, you will be working with a live camera feed so try different camera angles and tweak the settings(for both the contour filter and HSV threshold) until they work consistently with all camera angles and distances to the target.

1. Search for `Convex Hulls` and add it to the pipeline. This will turn our contour into a convex shape, which is useful for further processing.
   - You will probably need to increase the height of the pipeline panel to do this.
1. That's it, you have (hopefully) successfully built a vision pipeline.
1. You can go to Tools->Generate Code to generate Python code to put the final vision processing script.

### Localizing the target

Before doing anything, we first need to find a rotated rectangle bounding box for the contour. A guide on how to do this is present in [this OpenCV documentation page](https://docs.opencv.org/3.4/dd/d49/tutorial_py_contour_features.html). With the vertices of the rectangle, you can also find the center of the contour.

If it is safe to assume that the vision target will always be upright, then you can use a normal bounding rectangle rather than a rotated bounding rectangle.

Now that we have found the location of the vision target within an image, it's time to find it's location relative to the robot. Because we only have one camera, this is not a very simple task.

#### Angle to target

First, let's focus on getting the angle to target. In order to convert the pixel distance from the center of the target to the center of the image into an angle, we will need to know few key parameters that define the camera. To find these numbers, we need to perform camera calibration, a process described in [this other OpenCV documentation page](https://docs.opencv.org/4.5.2/dc/dbb/tutorial_py_calibration.html). The past year's HawkVision GitHub repository already contains code to do this. The OpenCV article also describes undistortion, which we will apply on the image before any further processing(yes, even before the GRIP pipeline).

Now, to find the angle to the target, we can use the accepted answer on this [StackOverflow thread](https://stackoverflow.com/questions/55080775/opencv-calculate-angle-between-camera-and-object). Also, the author of the StackOverflow answer uses Numpy, which is a Python linear algebra(matrix math) library. There's a lot of trignometric and linear algebraic wizardry going on in that answer, a lot of which I barely understand.

The first thing we need is a camera matrix, which we already have from the camera calibration. Let's call this `K`.

Now, we calculate the inverse of this matrix with `np.linalg.inv`. Matrix inverses and other basic linear algebra is stuff you learn in Pre-Calculus.

Now, when we perform `Ki.dot([x, y, 1.0])`, where x and y are the coordinates of the center of the vision target(or the top, in this case, because the top of the vision target is the center of the power port), we get a ray(a 3D vector), `r` pointing from the camera to the target. However, this is a unit vector, and doesn't contain the distance to the target. If you multiply this vector by the distance to the target, you can get the position of the target in 3D space, relative to the camera(x, y, and z coordinates).

Now, to find the horizontal angle, you can create another unit vector for the X axis:

```
x_axis = np.array([1.0, 0, 0])
```

and to get the angle between the x-axis and the ray, we can apply the angle between vectors equation:

$$
\theta = \frac{a \cdot b}{\lvert a \rvert \lvert b \rvert}
$$

```
angle = math.acos(r.dot(x_axis))
```

The bottom term is ommited here because we know the length of both vectors is 1.

Do note that this angle is from the x axis. Here's a top down representation of what that means:
<img
src="/img/programming/concepts/vision/x-axis.svg"
style={{ filter: useThemeContext().isDarkTheme ? "invert(1)" : "invert(0)" , width: '50rem'}}></img>

Just do the same for the y axis for vertical angle.
