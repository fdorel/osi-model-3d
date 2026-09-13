/**
 * Scene.jsx — Main Three.js scene component.
 * Wraps the OSI tower and its floor grid.
 */
import OSITower from './OSITower';

export default function Scene({ view, selectedLayer, onLayerHover }) {
  return (
    <OSITower
      view={view}
      selectedLayer={selectedLayer}
      onHover={onLayerHover}
    />
  );
}
