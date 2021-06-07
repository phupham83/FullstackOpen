import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

describe("<Blog />", () => {
    let component
    const mockHandler = jest.fn()
    const blog = {
        title: "Component testing is done with react-testing-library",
        author: "Phu Pham",
        url: "Http:/stuff.com",
        likes: 9
    }
    beforeEach(() => {
        component = render(
            <Blog blog={blog} handleUpdate ={mockHandler} />
        )
    })
    test("renders content", () => {
        expect(component.container).toHaveTextContent(
            "Component testing is done with react-testing-library"
        )
        expect(component.container).toHaveTextContent(
            "Phu Pham"
        )
    })
    test("at start the detail view is not displayed", () => {
        const div = component.container.querySelector(".detailView")
        expect(div).toHaveStyle("display: none")
    })
    test("after clicking the button, detail view is displayed", () => {
        const button = component.getByText("view")
        fireEvent.click(button)

        const div = component.container.querySelector(".detailView")
        expect(div).not.toHaveStyle("display: none")
    })
    test("event handler is called twice for 2 button clicks", () => {
        const button = component.getByText("like")
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
