async function init() {
    const node = document.querySelector("#type-text")

    await sleep(1000)
    await node.type("")

    let names = [
        "John","James","Mark","Eclaire","Adolf","Infected"
    ];
    let n="";
    let n_last="";

    while (true) {
        while (n===n_last) {
            n = names[Math.floor(Math.random() * names.length)];
        }
        n_last = n;

        await node.type(n);
        await sleep(5000)
        await node.delete(n);
    }
}


// Source code 🚩

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

class TypeAsync extends HTMLSpanElement {
    get text() {
        return this.innerText
    }
    set text(value) {
        return this.innerHTML = value
    }

    get typeInterval() {
        const randomMs = 300 * Math.random()
        return randomMs < 50 ? 10 : randomMs
    }

    async type(text) {
        for (let character of text) {
            this.text += character
            await sleep(this.typeInterval)
        }
    }

    async delete(text) {
        for (let character of text) {
            this.text = this.text.slice(0, this.text.length - 1)
            await sleep(this.typeInterval)
        }
    }
}

customElements.define('type-async', TypeAsync, { extends: 'span' })


init()
