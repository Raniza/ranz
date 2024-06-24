import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function OverlayTooltip({ id, children, title }) {
    return (
        <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
            {children}
        </OverlayTrigger>
    );
}
