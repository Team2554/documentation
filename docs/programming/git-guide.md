---
sidebar_label: Git Guide
sidebar_position: 2
---

# Team 2554 Git Version Control Guide

### What is git?

- Git is a **version control system**
  - Keeps track of code changes

### Why is git useful?

- Let’s take a scenario: Ved is coding, and makes a change that breaks the code. He saves and closes the file. Now when he wants to change the code back, he does not know what it originally was. The whole robotics team is in crisis and we lose all the matches in that season.
- Now lets see the same scenario but with git: Ved makes a breaking change. When he wants to revert the code, Ved simply restores to a previous version of the code. The robotics programming team continues to happily code and we get to the LeHigh District Championships for the first time in 11 years.

### How does git work?

- The main building block in git is a **repository**. A repository is where all the project code is stored. There is a **local repository** and a **remote repository**.
  - The **remote repository** is stored on a git service. The one we use is **GitLab**.
  - The **local repository** is stored on the **developer’s computer**

What is GitLab?

- GitLab is a git remote similar to GitHub. We will be using **GitLab** because it is not blocked on the Macbooks, and is more convenient to use if you need to code outside a robotics meeting.

How do I get started with GitLab?

1. Go to [http://gitlab.com](http://gitlab.com) and log in with your personal google account, twitter account, GitHub account, or create a new GitLab account.
2. Send me your GitLab username. To find your username:
   1. Click on your profile icon on the top right after logging in
   2. It will be below your name and start with a ‘@’ sign.

How does developing with git look like?

1. **Remote git repository** created
2. Repository initialized with files
   - You won’t need to worry about steps 1 and 2
3. Log in to GitLab. Click on the project name(FRC-2020). **DO NOT IGNORE THE WARNING TO SET A PASSWORD**. Click the link on the warning to set a password. You can ignore the other warning(the SSL one).
4. **Clone** the repository to your computer using the **`git clone https://git-url`** command.
   - To find the git url, click on the project name(FRC-2020) and click the blue clone button. Copy the url to clone with HTTPS.
5. Create and switch to a new **feature branch** using `**git checkout -b branch-name`\*\*.

   - Note: You can use `**git checkout branch-name**` (note that this does not have **-b**) to switch to different branches, and is useful if you are working on multiple projects

6. **Push** the **branch** to the **remote repository** using the **`git push -u origin branch-name`.** If you make further changes and need to push again, then just use **`git push branch-name`**

   - Note: here, **`origin`** is the default name for the main **git remote**. You can have multiple remotes of the same repository, but we are not doing that, so it is not important.
   - Note: In all repositories, there is a main **branch** named **`master`**. This is where all changes should finally end up. More on this later.
   - Note: The first time you push, you will be required to enter your GitLab credentials. Enter the username and the password you set from before.

7. Make code changes, and regularly use the **`git add .`** command and **`git commit -m "commit message"`** to save your changes.

   - Note: the **`git add`** command is used to include files in your next commit. **`git add .`** is used to add all the files you just changed. It is also possible to individually add specific files, if you don’t want to include all your changes in the next commit. This process is known as **staging**.

8. While making code changes, also regularly **`git pull origin master`**. This is so that you can regularly fix any **merge conflicts** that you have with the **main branch**, and so that there aren’t any issues with integrating your code later.

   - Note: A **merge conflict** is a scenario where the code stored locally in your repository doesn’t match the remote repository. In order to fix one, open the merge conflict in VSCode, fix it (VSCode tells you how to) and stage and commit just like a regular commit. If you are confused, ask for help.

9. As you are done with major sections of a feature you are working on, you can use the command **`git push origin branch-name`** to **push** your changes to the **feature branch** in the **remote repository**.
10. Once you are done with the whole feature, and have commited all your changes and pushed it to the **remote branch**, run **`git pull origin master`**, fix any **merge conflicts**(this can be done in VSCode), and if you had any merge conflicts, **add the files and commit the changes**. Push to the remote feature branch.
11. Once the remote branch is up to date, log onto GitLab and submit a **merge request**(more on this later) for your branch to be merged with the master branch. **DO NOT MERGE THE MERGE REQUEST YOURSELF**. The **merge request** needs to be **reviewed** before it can be **merged** with the **master branch**, and maybe **tested on the robot**.

    - Note: code can be tested on the robot even before a **merge request** is submitted. For example, if you are working on code to make the robot drive, and want to test it on the robot, you could push that code to the feature branch. This can then be loaded onto the main computer that communicates with the robot, and tested. Any quick fixes can be made and pushed to the feature branch. When it comes time to resume working on your computer, you can do **`git pull origin branch-name`** to download the quick fixes you made.

12. If any problems come up during code review and/or testing, the **merge request** will be **closed**, and you should fix those problems and follow **steps 7-11** again.
13. After all the problems are fixed, your merge request can be merged and you can be at peace for anywhere from a few seconds to a few meetings before you are assigned another task. Savour this little free time you have by frantically attempting to finish schoolwork on a meeting that ends at 8 because we didn’t do things fast enough until a week before competition before someone notices your patheticness and tells you to be more useful.
14. Once you are assigned another task, go back to **step 4**.

How do I create a merge request?

- Here’s a picture guide(before this, select the dropdown that says master and select the name of your branch):

1. ![drawing](/img/programming/git-guide/image1.png)

1. ![drawing](/img/programming/git-guide/image2.png)

1. Don’t click the buttons that I told you not to click. You can click `Close merge request` if you accidently made a merge request, but other than that, there is absolutely no point to clicking it.

What else can I not do?

- **NEVER **do `git push origin master`**.** The only way code should ever end up in the master branch is through **merge requests.**
- **NEVER** merge your own merge request or consequences similar to the one above will occur.
- Basically don’t mess with master and try your best to keep crappy code out of it.
- **NEVER** not use Google! It is your best friend. I get asked stupid questions way too many times and most of the time, the answer can be easily Googled.
- If you disobey these rules, the “Git Gods of Organized Programming” will come after you and haunt your dreams.
