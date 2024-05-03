// Copyright (c) 2020 by Juliusz Chroboczek.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

'use strict';

document.getElementById('passwordform').onsubmit = async function(e) {
    e.preventDefault();

    let parms = new URLSearchParams(window.location.search);
    let group = parms.get('group');
    if(!group) {
        displayError("Couldn't determine group");
        return;
    }
    let user = parms.get('username');
    if(!user) {
        displayError("Couldn't determine username");
        return;
    }

    let old = document.getElementById('old').value;
    let new1 = document.getElementById('new1').value;
    let new2 = document.getElementById('new2').value;
    if(new1 !== new2) {
        displayError("Passwords don't match.");
        return;
    }

    try {
        await setPassword(group, user, new1, old);
        document.getElementById('old').value = '';
        document.getElementById('new1').value = '';
        document.getElementById('new2').value = '';
        displayError(null);
        document.getElementById('message').textContent =
            'Password successfully changed.';
    } catch(e) {
        displayError(e.toString());
    }
}

function displayError(message) {
    document.getElementById('errormessage').textContent = (message || '');
}