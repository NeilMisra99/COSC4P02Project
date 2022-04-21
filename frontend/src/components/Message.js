import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import FlexContainer from './FlexContainer'
import { useTheme } from './ThemeContext'

export default function Message({ floatRight = false, message, speechRef, children }) {
	const [theme, setTheme] = useTheme()

	function handleOnClick() {
		if (!speechRef || !speechRef.current) return
		const speech = speechRef.current

		speech.speak({
			text: message.text,
		}).then(() => {
			console.log("Success !")
		}).catch(e => {
			console.error("An error occurred :", e)
		})
	}

	return (
		<FlexContainer flexDirection="column" alignItems={floatRight ? "flex-end" : "flex-start"} style={{ boxSizing: "border-box" }}>

			<FlexContainer flexDirection={floatRight ? "row-reverse" : "row"} >
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "40px",
						height: "40px",
						margin: floatRight ? "0 0 0 6px" : "0 6px 0 0",
						borderRadius: "50%",
						background: theme.colors.tertiaryColorBackground
					}}
				>
					<FontAwesomeIcon icon={message.fromUser ? solid('user') : solid('paw')} size="1x" style={{ height: "65%", color: theme.colors.userIconColor }} />
				</div> {/* user icon */}

				<div onClick={handleOnClick} style={{ minWidth: "max(100px, 16vw)", maxWidth: "70%", background: floatRight ? theme.colors.primaryColor : theme.colors.secondaryColor, color: "#ededed", fontSize: "1.2rem", padding: "8px", boxSizing: "border-box" }}>
					{message.text && <p style={{ fontSize: `${1.0 * theme.fontScaleFactor}rem` }}>{message.text}</p>}
					{message.image && <img src={message.image} style={{ width: "100%" }} />}
				</div>
			</FlexContainer >

			<p style={{ fontSize: `${0.8 * theme.fontScaleFactor}rem`, margin: "0 calc(40px + 6px) 0 calc(40px + 6px)", color: "grey" }}>sent at {message.time}</p>

		</FlexContainer >

	)
}