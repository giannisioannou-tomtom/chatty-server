## Release notes

### 2023-07-26

#### Features

* Improved welcome screen and handling of API key, unlock code and loading models. 
* Top status now always visible, to choose model and show release notes. 
* Improved message input box to only show "/" if applicable.

#### Bug fixes

* Fixed prompts selector. Only works on start of line and cannot scroll below list.
* Fixed cancelling prompt. Now empties input bar.
* Fixed message delete, which sometimes failed.

### 2023-07-24

#### Features
* Added token usage counter that turns red when older messages are being automatically discarded.
* Separated importing/exporting conversations and prompts. Both use the same file format and are compatible with the
  existing V4 format.
* Added menu on right side to deal with prompts.
* Added Markdown export of current conversation.
* Added screenshot export of current conversation.
* Added release notes button.
* Imported prompts update existing prompts and adds new prompts.
* Added multi-file selector for importing prompts.

#### Bug fixes

* Fixed time stamp bug when creating a new conversation.
* Improved server error handling and exception handling.
* Improved server timeout handling.
* Introduced 2 minute timout for really long responses.
* Fixed token count.
* Fixed screen width issues.
* Fixed icon of settings button on top.
* Improved layout of top bar.
* Full clean up of source code and directory structure, removal of old files.

### Found an issue?

Please report issues and features requests on the
[Github issue tracker](https://github.com/rijnb/chatty-server/issues).