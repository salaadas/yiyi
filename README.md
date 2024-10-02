# Quick start - yiyi (A chat app)

## Features

This is an **_invitation-based_** application, so:

- [x] No REGISTRATION
- [x] Chat 😅
- [x] Embed links
- [x] Delete messages
- [x] Mark messages as important
- [x] Display username (current displaying index)
- [x] Filter only links/media
- [x] Voice chat
- [x] Basic video call

I will continue to develop this from time to time, mainly adding WebRTC for video calling and share screen 👍🏻

## Goals

- [x] Learn more about subscriptions
- [x] Create a finished web (from `back` to `front`)
- [x] Learn files uploading (Cloudinary or S3, idk yet)

## Requirements

You need to have

- A postgresql database
- A redis database
- Nodejs (and also Yarn)

## Running

- Run `yarn` inside the `./client` and `./server` folder
- Provide the `.env` inside `./server` with the necessary information:
  - `DATABASE_URL`: the url to the postgres database
- ...

## WIP

The login page:

![login page](wip.jpg)
