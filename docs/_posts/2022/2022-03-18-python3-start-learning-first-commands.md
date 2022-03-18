---
layout: post
title: Python3 start learning first commands
categories: ["Python3", "Learning", "first-commands"]
tags:       ["python", "python3", "learning", "first-command"]
---

So, if you just start learning Python 3, where are some tips to help you start.

Assume you already installed `Python 3` and is worked properly, here is simple commands to start.

----

## import this in Python 3

Start the python3 then type `import this`, and you should get the output below.

Basically is a "best practices" for coding.

```python
import this                                                                       
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```

----

## ask for help in Python 3

The `help()` command will be like a manual and samples commands

```python
help()                                                      

Welcome to Python 3.8's help utility!

If this is your first time using Python, you should definitely check out
the tutorial on the Internet at https://docs.python.org/3.8/tutorial/.

Enter the name of any module, keyword, or topic to get help on writing
Python programs and using Python modules.  To quit this help utility and
return to the interpreter, just type "quit".

To get a list of available modules, keywords, symbols, or topics, type
"modules", "keywords", "symbols", or "topics".  Each module also comes
with a one-line summary of what it does; to list the modules whose name
or summary contain a given string such as "spam", type "modules spam".
```

### List available modules in Python 3 with help command

After executing `help()`, simply type `modules`.

```python
help> modules

Please wait a moment while I gather a list of all available modules...

IPython             _tracemalloc        gzip                secrets
__future__          _uuid               hashlib             select
_abc                _warnings           heapq               selectors
_ast                _weakref            hmac                shelve
_asyncio            _weakrefset         html                shlex
_bisect             _xxsubinterpreters  http                shutil
_blake2             _xxtestfuzz         imaplib             signal
_bootlocale         abc                 imghdr              site
_bz2                aifc                imp                 sitecustomize
_codecs             antigravity         importlib           six
_codecs_cn          argparse            inspect             smtpd
_codecs_hk          array               io                  smtplib
_codecs_iso2022     ast                 ipaddress           sndhdr
_codecs_jp          asynchat            ipython_genutils    socket
_codecs_kr          asyncio             itertools           socketserver
_codecs_tw          asyncore            jedi                spwd
_collections        atexit              json                sqlite3
_collections_abc    audioop             keyword             sre_compile
_compat_pickle      autoreload          linecache           sre_constants
_compression        backcall            locale              sre_parse
_contextvars        base64              logging             ssl
_crypt              bdb                 lzma                stat
_csv                binascii            mailbox             statistics
_ctypes             binhex              mailcap             storemagic
_ctypes_test        bisect              marshal             string
_curses             builtins            math                stringprep
_curses_panel       bz2                 mimetypes           struct
_datetime           cProfile            mmap                subprocess
_dbm                calendar            modulefinder        sunau
_decimal            cgi                 multiprocessing     symbol
_dummy_thread       cgitb               netrc               sympyprinting
_elementtree        chunk               nis                 symtable
_functools          cmath               nntplib             sys
_hashlib            cmd                 ntpath              sysconfig
_heapq              code                nturl2path          syslog
_imp                codecs              numbers             tabnanny
_io                 codeop              opcode              tarfile
_json               collections         operator            telnetlib
_locale             colorsys            optparse            tempfile
_lsprof             compileall          os                  termios
_lzma               concurrent          ossaudiodev         test
_markupbase         configparser        parser              tests
_md5                contextlib          parso               textwrap
_multibytecodec     contextvars         pathlib             this
_multiprocessing    copy                pdb                 threading
_opcode             copyreg             pexpect             time
_operator           crypt               pickle              timeit
_osx_support        csv                 pickleshare         token
_pickle             ctypes              pickletools         tokenize
_posixshmem         curses              pipes               trace
_posixsubprocess    cythonmagic         pkg_resources       traceback
_py_abc             dataclasses         pkgutil             tracemalloc
_pydecimal          datetime            platform            traitlets
_pyio               dbm                 plistlib            tty
_queue              decimal             poplib              turtle
_random             decorator           posix               types
_sha1               difflib             posixpath           typing
_sha256             dis                 pprint              unicodedata
_sha3               distutils           profile             unittest
_sha512             doctest             prompt_toolkit      urllib
_signal             dummy_threading     pstats              uu
_sitebuiltins       email               pty                 uuid
_socket             encodings           ptyprocess          venv
_sqlite3            enum                pwd                 warnings
_sre                errno               py_compile          wave
_ssl                faulthandler        pyclbr              wcwidth
_stat               fcntl               pydoc               weakref
_statistics         filecmp             pydoc_data          webbrowser
_string             fileinput           pyexpat             wsgiref
_strptime           fnmatch             pygments            xdrlib
_struct             formatter           queue               xml
_symtable           fractions           quopri              xmlrpc
_sysconfigdata__linux_x86_64-linux-gnu ftplib              random              xxlimited
_sysconfigdata__x86_64-linux-gnu functools           re                  xxsubtype
_testbuffer         gc                  readline            zipapp
_testcapi           genericpath         reprlib             zipfile
_testimportmultiple getopt              resource            zipimport
_testinternalcapi   getpass             rlcompleter         zlib
_testmultiphase     gettext             rmagic              
_thread             glob                runpy               
_threading_local    grp                 sched               

Enter any module name to get more help.  Or, type "modules spam" to search
for modules whose name or summary contain the string "spam".

help> 
```

### List available TOPICS in Python 3 with help command

```python
help> topics

Here is a list of available topics.  Enter any topic name to get more help.

ASSERTION           DELETION            LOOPING             SHIFTING
ASSIGNMENT          DICTIONARIES        MAPPINGMETHODS      SLICINGS
ATTRIBUTEMETHODS    DICTIONARYLITERALS  MAPPINGS            SPECIALATTRIBUTES
ATTRIBUTES          DYNAMICFEATURES     METHODS             SPECIALIDENTIFIERS
AUGMENTEDASSIGNMENT ELLIPSIS            MODULES             SPECIALMETHODS
BASICMETHODS        EXCEPTIONS          NAMESPACES          STRINGMETHODS
BINARY              EXECUTION           NONE                STRINGS
BITWISE             EXPRESSIONS         NUMBERMETHODS       SUBSCRIPTS
BOOLEAN             FLOAT               NUMBERS             TRACEBACKS
CALLABLEMETHODS     FORMATTING          OBJECTS             TRUTHVALUE
CALLS               FRAMEOBJECTS        OPERATORS           TUPLELITERALS
CLASSES             FRAMES              PACKAGES            TUPLES
CODEOBJECTS         FUNCTIONS           POWER               TYPEOBJECTS
COMPARISON          IDENTIFIERS         PRECEDENCE          TYPES
COMPLEX             IMPORTING           PRIVATENAMES        UNARY
CONDITIONAL         INTEGER             RETURNING           UNICODE
CONTEXTMANAGERS     LISTLITERALS        SCOPING             
CONVERSIONS         LISTS               SEQUENCEMETHODS     
DEBUGGING           LITERALS            SEQUENCES           

help> 
```

### ask for help on a specific module

```python
help> http
help> http		
Help on package http:

NAME
    http

MODULE REFERENCE
    https://docs.python.org/3.8/library/http
    
    The following documentation is automatically generated from the Python
    source files.  It may be incomplete, incorrect or include features that
    are considered implementation detail and may vary between Python
    implementations.  When in doubt, consult the module reference at the
    location listed above.

PACKAGE CONTENTS
    client
    cookiejar
    cookies
    server

CLASSES
    enum.IntEnum(builtins.int, enum.Enum)
        HTTPStatus
        (....)
```

you get the idea...


----

## use dir in Python 3 to see what is available on the module

```python
import http                                                                                                                                         

dir(http)                                                                                                                                           

['HTTPStatus',
 'IntEnum',
 '__all__',
 '__builtins__',
 '__cached__',
 '__doc__',
 '__file__',
 '__loader__',
 '__name__',
 '__package__',
 '__path__',
 '__spec__',
 'client']
```

----

## use type to confirm the type of variable

```python3
var1 = 'a'
var2 = 1
var3 = ('a','b','c')
var4 = ['a','b','c']
var5={'Website':'AntonioFeijao.com','LinkedIn':'AntonioFeijaoUK'}                     

type(var1)                                                                                                                                          
str

type(var2)                                                                                                                                          
int

type(var3)                                                                                                                                          
tuple

type(var4)                                                                                                                                          
list

type(var5)                                                                                                                                          
dict
```

## Conclusion

Here we mentioned `help()`, `help> modules`, `help> topics`, `help> http`, `dir(imported_module`, `type(var...)`...

I hope these tips will help you explore Python 3 further and at the same time having some fun.

There are, of course various free resources only, for example this one <https://www.tutorialspoint.com/python3/index.htm> .


Have fun learning,

Antonio Feijao
