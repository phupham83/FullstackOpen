import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Blogform from "./Blogform"

test("<Blogform /> updates parent state and calls onSubmit", () => {
    const handleCreate = jest.fn()
    const component = render(
        <Blogform handleCreate ={handleCreate}/>
    )

    const inputTitle = component.container.querySelector("#title")
    const inputAuthor = component.container.querySelector("#author")
    const inputUrl = component.container.querySelector("#url")
    const form = component.container.querySelector("form")
    fireEvent.change(inputTitle, {
        target: { value: "testing of forms could be easier" }
    })
    fireEvent.change(inputAuthor, {
        target: { value: "Phu Pham" }
    })
    fireEvent.change(inputUrl, {
        target: { value: "HTTP:test.com" }
    })

    fireEvent.submit(form)

    expect(handleCreate.mock.calls).toHaveLength(1)
    expect(handleCreate.mock.calls[0][0].title).toBe("testing of forms could be easier")
    expect(handleCreate.mock.calls[0][0].author).toBe("Phu Pham")
    expect(handleCreate.mock.calls[0][0].url).toBe("HTTP:test.com")

})