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

*None.*


<!--END:options-->

<!--START:action-list-->


## Action Patterns

* ["role":"entity","base":"eventbrite","cmd":"load","name":"attendee","zone":"provider"](#-roleentitybaseeventbritecmdloadnameattendeezoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"attendee_report","zone":"provider"](#-roleentitybaseeventbritecmdloadnameattendee_reportzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"category","zone":"provider"](#-roleentitybaseeventbritecmdloadnamecategoryzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"discount","zone":"provider"](#-roleentitybaseeventbritecmdloadnamediscountzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"display_settings","zone":"provider"](#-roleentitybaseeventbritecmdloadnamedisplay_settingszoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"event","zone":"provider"](#-roleentitybaseeventbritecmdloadnameeventzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"event_capacity","zone":"provider"](#-roleentitybaseeventbritecmdloadnameevent_capacityzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"event_series","zone":"provider"](#-roleentitybaseeventbritecmdloadnameevent_serieszoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"event_team","zone":"provider"](#-roleentitybaseeventbritecmdloadnameevent_teamzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"format","zone":"provider"](#-roleentitybaseeventbritecmdloadnameformatzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"inventory_tier","zone":"provider"](#-roleentitybaseeventbritecmdloadnameinventory_tierzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"media","zone":"provider"](#-roleentitybaseeventbritecmdloadnamemediazoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"order","zone":"provider"](#-roleentitybaseeventbritecmdloadnameorderzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"published_structured_content","zone":"provider"](#-roleentitybaseeventbritecmdloadnamepublished_structured_contentzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"sales_report","zone":"provider"](#-roleentitybaseeventbritecmdloadnamesales_reportzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"text_overrides","zone":"provider"](#-roleentitybaseeventbritecmdloadnametext_overrideszoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"ticket_buyer_settings","zone":"provider"](#-roleentitybaseeventbritecmdloadnameticket_buyer_settingszoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"ticket_class","zone":"provider"](#-roleentitybaseeventbritecmdloadnameticket_classzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"ticket_group","zone":"provider"](#-roleentitybaseeventbritecmdloadnameticket_groupzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"user","zone":"provider"](#-roleentitybaseeventbritecmdloadnameuserzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"venue","zone":"provider"](#-roleentitybaseeventbritecmdloadnamevenuezoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"load","name":"working_structured_content","zone":"provider"](#-roleentitybaseeventbritecmdloadnameworking_structured_contentzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"attendee","zone":"provider"](#-roleentitybaseeventbritecmdsavenameattendeezoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"attendee_report","zone":"provider"](#-roleentitybaseeventbritecmdsavenameattendee_reportzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"category","zone":"provider"](#-roleentitybaseeventbritecmdsavenamecategoryzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"discount","zone":"provider"](#-roleentitybaseeventbritecmdsavenamediscountzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"display_settings","zone":"provider"](#-roleentitybaseeventbritecmdsavenamedisplay_settingszoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"event","zone":"provider"](#-roleentitybaseeventbritecmdsavenameeventzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"event_capacity","zone":"provider"](#-roleentitybaseeventbritecmdsavenameevent_capacityzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"event_series","zone":"provider"](#-roleentitybaseeventbritecmdsavenameevent_serieszoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"event_team","zone":"provider"](#-roleentitybaseeventbritecmdsavenameevent_teamzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"format","zone":"provider"](#-roleentitybaseeventbritecmdsavenameformatzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"inventory_tier","zone":"provider"](#-roleentitybaseeventbritecmdsavenameinventory_tierzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"media","zone":"provider"](#-roleentitybaseeventbritecmdsavenamemediazoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"order","zone":"provider"](#-roleentitybaseeventbritecmdsavenameorderzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"published_structured_content","zone":"provider"](#-roleentitybaseeventbritecmdsavenamepublished_structured_contentzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"sales_report","zone":"provider"](#-roleentitybaseeventbritecmdsavenamesales_reportzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"text_overrides","zone":"provider"](#-roleentitybaseeventbritecmdsavenametext_overrideszoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"ticket_buyer_settings","zone":"provider"](#-roleentitybaseeventbritecmdsavenameticket_buyer_settingszoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"ticket_class","zone":"provider"](#-roleentitybaseeventbritecmdsavenameticket_classzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"ticket_group","zone":"provider"](#-roleentitybaseeventbritecmdsavenameticket_groupzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"user","zone":"provider"](#-roleentitybaseeventbritecmdsavenameuserzoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"venue","zone":"provider"](#-roleentitybaseeventbritecmdsavenamevenuezoneprovider-)
* ["role":"entity","base":"eventbrite","cmd":"save","name":"working_structured_content","zone":"provider"](#-roleentitybaseeventbritecmdsavenameworking_structured_contentzoneprovider-)


<!--END:action-list-->

<!--START:action-desc-->


## Action Descriptions

### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"attendee","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"attendee_report","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"category","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"discount","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"display_settings","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"event","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"event_capacity","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"event_series","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"event_team","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"format","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"inventory_tier","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"media","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"order","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"published_structured_content","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"sales_report","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"text_overrides","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"ticket_buyer_settings","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"ticket_class","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"ticket_group","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"user","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"venue","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"load","name":"working_structured_content","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"attendee","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"attendee_report","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"category","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"discount","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"display_settings","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"event","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"event_capacity","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"event_series","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"event_team","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"format","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"inventory_tier","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"media","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"order","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"published_structured_content","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"sales_report","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"text_overrides","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"ticket_buyer_settings","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"ticket_class","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"ticket_group","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"user","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"venue","zone":"provider"` &raquo;

No description provided.



----------
### &laquo; `"role":"entity","base":"eventbrite","cmd":"save","name":"working_structured_content","zone":"provider"` &raquo;

No description provided.



----------


<!--END:action-desc-->