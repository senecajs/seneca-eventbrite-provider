![Seneca Eventbrite-Provider](http://senecajs.org/files/assets/seneca-logo.png)

> _Seneca Eventbrite-Provider_ is a plugin for [Seneca](http://senecajs.org)

Handle incoming messages within other frameworks.

[![npm version](https://img.shields.io/npm/v/@seneca/eventbrite-provider.svg)](https://npmjs.com/package/@seneca/eventbrite-provider)
[![build](https://github.com/senecajs/seneca-eventbrite-provider/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-eventbrite-provider/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/senecajs/seneca-eventbrite-provider/badge.svg?branch=main)](https://coveralls.io/github/senecajs/seneca-eventbrite-provider?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-eventbrite-provider/badge.svg)](https://snyk.io/test/github/senecajs/seneca-eventbrite-provider)
[![DeepScan grade](https://deepscan.io/api/teams/5016/projects/19458/branches/505693/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5016&pid=19458&bid=505693)
[![Maintainability](https://api.codeclimate.com/v1/badges/562abed571a4f6412c3a/maintainability)](https://codeclimate.com/github/senecajs/seneca-eventbrite-provider/maintainability)

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
|---|---|

## Getting an Eventbrite API Key

Before you can start interacting with Eventbrite, you'll need to :
* [Create an account](https://www.eventbrite.com/signin/).
* Go to the [Developer Portal](https://www.eventbrite.com/platform/) and click "Get a Free API Key" to retrieve your API key.

Read more on [getting a token](https://www.eventbrite.com/platform/api#/introduction/authentication).

<!--START:options-->


## Options

* `debug` : boolean <i><small>false</small></i>


Set plugin options when loading with:
```js


seneca.use('EventbriteProvider', { name: value, ... })


```


<small>Note: <code>foo.bar</code> in the list above means 
<code>{ foo: { bar: ... } }</code></small> 



<!--END:options-->

<!--START:action-list-->


## Action Patterns

* [role:entity,base:eventbrite,cmd:load,name:event,zone:provider](#-roleentitybaseeventbritecmdloadnameeventzoneprovider-)
* [role:entity,base:eventbrite,cmd:save,name:event,zone:provider](#-roleentitybaseeventbritecmdsavenameeventzoneprovider-)


<!--END:action-list-->

<!--START:action-desc-->


## Action Descriptions

### &laquo; `role:entity,base:eventbrite,cmd:load,name:event,zone:provider` &raquo;

Load an Eventbrite event data into an entity.



----------
### &laquo; `role:entity,base:eventbrite,cmd:save,name:event,zone:provider` &raquo;

Update an Eventbrite event data from an entity.



----------


<!--END:action-desc-->