# Contributing

We'll be following a fork and pull based workflow. This means that we'll be working off of individual forks of a central repository, and adding our work to the central repository through submitted and reviewed pull requests. This allows for code review before integration and a (theoretically) clean commit history.

This workflow is based (nearly verbatim) on the workflow described [here](https://github.com/sevntu-checkstyle/sevntu.checkstyle/wiki/Development-workflow-with-Git%3A-Fork,-Branching,-Commits,-and-Pull-Request). Please read as much as possible about git in general before jumping in - git can be a difficult tool to feel comfortable with. When in doubt, move slowly!

### Local development

1. Fork the central repo at [https://github.com/SuspiciousPi/SuspiciousPi](https://github.com/SuspiciousPi/SuspiciousPi.git)

1. Clone the forked repo to your local machine

    ```bash
    $ git clone https://github.com/USERNAME/SuspiciousPi.git
    ```

1. Configure the remotes by adding the central repository as 'upstream'

    ```bash
    $ git remote add upstream https://github.com/SuspiciousPi/SuspiciousPi.git
    ```

1. Create a new branch for the feature you'd like to work on. Please try to name the branch as appropriately as possible (be terse, yet descriptive).

    ```bash
    $ git checkout -b your-sweet-new-branch
    ```

1. Develop on **your-sweet-new-branch** only. **DO NOT merge the upstream master with your development branch!**

1. Commit your changes to your **your-sweet-new-branch**. Be descriptive, but not too much so. Later, we'll be condensing all of your work into one big commit - that's where you'll want to tell us all of the work you did in a bit more detail. 

    ```bash
    $ git add FILE
    $ git commit -m "Sweet new feature added"
    ```

    It's **VERY** tempting to use `git commit -A` or `git commit .` to add every file you've been working on at once, but it's often best to add files manually - you'll get a much better feel for figuring out *exactly* what git is doing when, and this can be invaluable when things get hairy.

1. Push your work to your origin repo (the fork). Do it often enough that you won't lose everything if your machine gets coffee spilled on it.

    ```
    $ git push origin your-sweet-new-branch
    ```

1. Repeat the last few steps until development is complete, and you're ready to submit a pull request to the central repository.

### Submitting a pull request

The feature you're working on is perfect, and the code you've written would make Fred proud. Now's the time to let yourself shine, and add your contributions to the team's central repository. You'll be doing this with a pull request, which will allow team members to check out the features you've been working with and see how they work with what's already been done.

1. You might be significantly behind the central repository. Fix this by fetching all the changes that have occurred since you forked the repo and began working on it.

    ```bash
    $ git fetch upstream
    ```

1. Update the local master branch

    ```bash
    $ git checkout master
    $ git pull upstream master
    ```

1. Rebase **your-sweet-new-branch** on top of the upstream master

    ```bash
    $ git checkout your-sweet-new-branch
    $ git rebase master
    ```

1. In the process of the rebase, git may discover conflicts. In that case git will stop and allow you to fix the conflicts. This can be a potentially challenging thing - **PLEASE** read as much as you can about this process to ensure it goes smoothly. The best way to think about this process is selecting which version of a file you'd like to commit, or merging files that might have different things going on in them.

    It's **VERY** important to be as deliberate as possible in this process. For instance, if the rebase says their is a CONFLICT in mySweetClass.js checkout both versions of the file to see where the conflict arises. For instance

    ```bash
    $ git checkout master mySweetClass.js
    # Check out the upstream/master version of the file
    $ git checkout your-sweet-new-branch mySweetClass.js
    # Check out your version of the file and see if you indeed want the changes
    ```

    Occasionally, a file may have differences between the two versions that you'd like to combine. Go through the code and manage those differences, making sure to be **VERY** deliberate as you move forward.

    Once all conflicts have been resolved, simply add the file using

    ```bash
    $ git add mySweetClass.js
    ```

1. After fixing conflicts, use `git add FILENAME` to update the index with the resolved files. When all conflicts are resolved, continue the rebase

    ```bash
    $ git rebase --continue
    ```

1. Once all of the conflicts are resolved, and your feature branch is rebased on top of upstream master, you'll want to condense all of your commits into one, big, beautiful commit to succinctly yet descriptively describe all of the work you've done. This will make the history of the central repository much easier to read.

### Flatten your commits

1. Now we flatten all commits on the feature branch into one single large commit for the upcoming pull request. First, identify the hash of the commit at the top of upstream/master, in this case 95f4a52.  

    ```bash
    * ba5599a 2015-01-24 | Even more cool stuff (HEAD, your-sweet-new-branch) 
    * c294daf 2015-01-24 | Some cool new stuff
    * d603a49 2015-01-24 | Sample Commit
    *   95f4a52 2015-01-24 | Merge pull request #27 (upstream/master)
    ```

1. We'll be rebasing to this point - think of it as the base under a stack of commits you'll be squishing together. To do this, use:

    ```bash
    git rebase -i `hash of (upstream/master)`
    ```

1. This will open up your text editor and show you something like this:

    ```sh
    pick d603a49 Sample Commit
    pick c294daf Some cool new stuff
    pick ba5599a Even more cool stuff
    ```

1. Change every commit but the first to 'squish' (or 's' for short), winding up with something like this:

    ```sh
    pick d603a49 Sample Commit
    squish c294daf Some cool new stuff
    squish ba5599a Even more cool stuff
    ```

1. If all goes well, another text editor will open prompting you for a new commit message for the entire 'squashed' commit. Rename it appropriately, and if all goes well you'll have a new history with all recent commits rolled into one, ready for a pull request.

    ```bash
    * sa92dh2 2015-01-24 | All the commits! (HEAD, your-sweet-new-branch) 
    *   95f4a52 2015-01-24 | Merge pull request #27 (upstream/master)
    ```

1. Now that your history has been condensed to one awesome commit message, you'll want to push to your fork so that you can submit a pull request. Since your local branch is the condensed single commit, and the origin branch has the full commit history, github is not going to be happy. In order to make it work, you'll have to force the push to github. **NEVER EVER force push to the upstream repository!**

    ```bash
    $ git push origin your-sweet-new-branch --force
    ```

1. Once the condensed feature branch is pushed to your origin, you can [submit a pull request](https://help.github.com/articles/using-pull-requests/)!


### Merging pull requests

1. It's a pretty bad idea to merge your own pull requests. Make sure that somebody reviews your pull request before they merge it in to ensure that your code doesn't break anything and your rebasing went smoothly.

1. To merge a pull request, follow the steps outlined next to the "Merge Pull Request" button. For more information, please read [how to check out pull requests locally](https://help.github.com/articles/checking-out-pull-requests-locally/)

1. Pull down the pull request to your local repository and make sure it works. **PLEASE** check the history to ensure that the rebase process went smoothly and merging the pull request will maintain a clear and concise commit history on the master repo.

1. Once everything checks out, merge the pull request and keep on working!



