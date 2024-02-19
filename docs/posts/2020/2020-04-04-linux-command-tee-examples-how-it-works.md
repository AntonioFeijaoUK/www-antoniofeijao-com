---
date: 2020-04-04
last_modified_at: 2024-02-19
categories:
    - Linux
    - Bash
tags:
    - linux
    - bash
    - shell-scripting
    - parallel
---

# linux-command-tee-examples-how-it-works

`tee` command in Linux command line, how `tee` works, simple explanations.

The `tee` command has an input on the and one or more exists or outputs.

Output to a file or more, or another command AND output to the screen.


`cat SAMPLE_FILE | tee  > this_file.log`

```bash

INPUT >>> ----|-----  >>> output_file1 output_file2 output_file3 OR/AND | output_to_another_command
              |
              |
              |
              |
              |
              
              also >>>> output_to_screen (unless you `2>/dev/null` (TBC?!) )

```

---

Happy learning

[Antonio Feijao UK](https://www.antoniofeijao.com/)

