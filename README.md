# 3.0 Warning
3.0 is now a static API. This means .getInstance() is no longer needed for access to services.
3.0 also moves a lot of APIs around inside the folders which may require fixing a bunch of paths.

If you are not ready to spend some time upgrading, staying on 2.x is totally fine. 
It just wont recieve any new API or updates.


# TreeLib

Treelib is a library of typescript made for Warcraft 3 v1.32+.
It requires the map to be set to LUA as typescript compiles to lua.

It's built for TSTL and not intended to work with other tooling currently.

There is an NPM package of it here:
https://www.npmjs.com/package/wc3-treelib


## Kanban
https://trello.com/b/wdLuUlL3/treelib
Here is my internal kanban board, its readonly but occasionally i set up things i want to add there.
You can find me primarily in the Hive workshop discord: https://discord.hiveworkshop.com/

## How to install
Use a wc3 template like https://github.com/cipherxof/wc3-ts-template and then add "wc3-treelib" as a devDependency.

npm install the dependencies.

Go into your tsconfig.json and add "wc3-treelib" to the "types" array.

You can now use all TreeLib functionality and hopefully get autocomplete in your IDE.
