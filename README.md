# audiomark

*Audiomark* is a demo app that allows audio to be recorded in a web browser. The audio file is stored in a PouchDB database 
where it is synced to remote Cloudant database. Once recorded a QR-code is generated that links to the URL where the audio file will
live once it reaches the cloud. 

The original use-case was a teacher dictating notes into a phone, printing the QR-code and attaching it to student's work.

Audiomark uses the following technologies:

## PouchDB

PouchDB is an in-browser NoSQL database. It stores JSON documents locally. This means that we don't lose recordings if we're offline
or have a flaky internet connection. 

## Cloudant Envoy

Cloudant Envoy is used to serve out the application using its Express framework, and allow multiple PouchDB users to sink their individual,
per-user databases to a single Cloudant database. It also handles Facebook authentication.

## MSR

A cross-browser audio recording library.

## qrcode.js

Client-side, QR-code generator.

## Materialize-CSS 

A front-end HTML/CSS framework to create an app-like user experience in HTML.
