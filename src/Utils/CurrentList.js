import React, { Component } from 'react'

export let Books = [];
export function SetBooks(books){
    Books = books
}
export let CurrentSetter = undefined

export function SetSetter(setter){
    CurrentSetter = setter
}