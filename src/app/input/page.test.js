import { describe, it, expect, vi } from "vitest";
import Input from "./page";
import { act, fireEvent, prettyDOM, render, screen } from "@testing-library/react";

describe("react-intl-tel-input", () =>{

    vi.mock('next/dynamic', async () => {
        const dynamicModule = await vi.importActual('next/dynamic');
        return {
            default: (loader) => {
                const dynamicActualComp = dynamicModule.default;
                const RequiredComponent = dynamicActualComp(loader);
                RequiredComponent.preload ? RequiredComponent.preload() : RequiredComponent.render.preload();
                return RequiredComponent;
            },
        };
    });

    it('render error with US Flag', async() => {
        const wrapper = render(<Input/>);

        expect(wrapper.container.querySelector(".selected-flag").title).toContain("United States");
        expect(screen.queryByText("* Please enter valid number.")).not.toBeInTheDocument();
        
        fireEvent.focus(screen.queryByRole('textbox'));
        act(() => {
            fireEvent.change(screen.queryByRole('textbox'), {target: { value: "1234567890" } });
        });
        fireEvent.blur(screen.queryByRole('textbox'));
        expect(screen.queryByText("* Please enter valid number.")).toBeInTheDocument();
    });

    it("valid mobile number", () => {
        const wrapper = render(<Input/>);
        expect(wrapper.container.querySelector(".selected-flag").title).toContain("United States");
        fireEvent.focus(screen.queryByRole('textbox'));
        fireEvent.change(screen.queryByRole('textbox'), {target: { value: "2345678901" } });
        fireEvent.blur(screen.queryByRole('textbox'));
        expect(screen.queryByRole('textbox').value).toBe("(234) 567-8901");
        expect(screen.queryByText("* Please enter valid number.")).not.toBeInTheDocument();
    });

    it('change flag to India valid', () => {
        const wrapper = render(<Input/>);
        fireEvent.click(screen.queryByText("+ 91"));
        expect(wrapper.container.querySelector(".selected-flag").title).toContain("India");
        expect(screen.queryByText("* Please enter valid number.")).toBeInTheDocument();

        fireEvent.focus(screen.queryByRole('textbox'))
        fireEvent.change(screen.queryByRole('textbox'), { preventDefault: () => {}, target:{ value: "01234567890" }});
        expect(screen.queryByRole('textbox').value).toBe("01234 567 890");
        fireEvent.blur(screen.queryByRole('textbox'));
        expect(screen.queryByText("* Please enter valid number.")).not.toBeInTheDocument();
    });

    it('change flag to India error', () => {
        const wrapper = render(<Input/>);
        fireEvent.click(screen.queryByText("+ 91"));
        expect(wrapper.container.querySelector(".selected-flag").title).toContain("India");
        expect(screen.queryByText("* Please enter valid number.")).toBeInTheDocument();

        fireEvent.focus(screen.queryByRole('textbox'))
        fireEvent.change(screen.queryByRole('textbox'), { preventDefault: () => {}, target:{ value: "0123456789" }});
        expect(screen.queryByRole('textbox').value).toBe("123456789");
        fireEvent.blur(screen.queryByRole('textbox'));
        expect(screen.queryByText("* Please enter valid number.")).toBeInTheDocument();
    });
});
