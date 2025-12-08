import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "~/index.css"
import "react-datepicker/dist/react-datepicker.css"
import App from "~/App.tsx"
import { QCProvider } from "~/providers"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QCProvider>
			<App />
		</QCProvider>
	</StrictMode>
)
