
import Preview from "@/components/business/preview";
import "../style.css"
import ReactDOM from "react-dom/client";


export default defineContentScript({
    matches: ["*://*/*"],
    cssInjectionMode: "ui",
    
    async main(ctx) {
        const ui = await createShadowRootUi(ctx, {
            name: "vista-foucs",
            position: "inline",
            anchor: "body",
            append: "first",
            onMount: (container) => {
                // Don't mount react app directly on <body>
                const wrapper = document.createElement("div");
                container.append(wrapper);
                container.style.zIndex="2147483647"

                const root = ReactDOM.createRoot(wrapper);
                root.render(<Preview />);
                return { root, wrapper };
            },
            onRemove: (elements) => {
                elements?.root.unmount();
                elements?.wrapper.remove();
            },
        });

        ui.mount();
    },
});