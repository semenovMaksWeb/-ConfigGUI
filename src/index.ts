const commandList = () => {
    const commandListContainer = document.querySelector("container");
    if (!commandListContainer) {
        return;
    }

    commandListContainer.addEventListener(`dragstart`, (evt) => {
        const target = evt.target as HTMLElement;
        target.classList.add(`selected`);
    })

    commandListContainer.addEventListener(`dragend`, (evt) => {
        const target = evt.target as HTMLElement;
        target.classList.remove(`selected`);
    });

    commandListContainer.addEventListener(`dragover`, (evt) => {
        evt.preventDefault();
        const activeElement = commandListContainer.querySelector(`.selected`) as HTMLElement;
        const currentElement = evt.target as HTMLElement;

        // исправление ошибки перемещения родителя в потомка;
        if (currentElement.closest(".commandItemParent") == activeElement) {
            return;
        }

        // перенести в родителя
        if (activeElement !== currentElement && currentElement.classList.contains(`commandItemParent`)) {
            const parent = currentElement.querySelector(".commandItemChildren") as HTMLElement;
            parent.appendChild(activeElement);
            return;
        }

        // перенести в другую позицию
        if (activeElement !== currentElement && currentElement.classList.contains(`commandItem`)) {
            const nextElement = (currentElement === activeElement.nextElementSibling) ? currentElement.nextElementSibling : currentElement;
            const parent = currentElement.parentElement as HTMLElement;
            parent.insertBefore(activeElement, nextElement);
        }
    })
}