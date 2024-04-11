
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Sherrifs",
	description: "Get data on Sherrifs and Magistrates Courts In South Africa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
			<html lang="en" >
				<body className="bg-background text-foreground">
					{children}
					<Toaster />
				</body>
			</html>
		);
}
