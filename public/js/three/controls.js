// controls.js


// controls = new THREE.OrbitControls(camera, container);
// controls.addEventListener( 'change', render );

var makeControls = function(camera, container) {

  var controls = new THREE.TrackballControls(camera, container);
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

};

  /** Event fired when the mouse button is pressed down */
  function onDocumentMouseDown(event) {
      event.preventDefault();

      /** Calculate mouse position and project vector through camera and mouse3D */
      mouse3D.x = mouse2D.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse3D.y = mouse2D.y = -(event.clientY / window.innerHeight) * 2 + 1;
      mouse3D.z = 0.5;
      projector.unprojectVector(mouse3D, camera);

      var ray = new THREE.Ray(camera.position, mouse3D.subSelf(camera.position).normalize());

      var intersects = ray.intersectObject(maskMesh);

      if (intersects.length > 0) {
          SELECTED = intersects[0].object;
          var intersects = ray.intersectObject(plane);
          offset.copy(intersects[0].point).subSelf(plane.position);
          killControls = true;
      }
      else if (controls.enabled == false)
          controls.enabled = true;
  }

  /** This event handler is only fired after the mouse down event and
      before the mouse up event and only when the mouse moves */
  function onDocumentMouseMove(event) {
      event.preventDefault();

      /** Calculate mouse position and project through camera and mouse3D */
      mouse3D.x = mouse2D.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse3D.y = mouse2D.y = -(event.clientY / window.innerHeight) * 2 + 1;
      mouse3D.z = 0.5;
      projector.unprojectVector(mouse3D, camera);

      var ray = new THREE.Ray(camera.position, mouse3D.subSelf(camera.position).normalize());

      if (SELECTED) {
          var intersects = ray.intersectObject(plane);
          SELECTED.position.copy(intersects[0].point.subSelf(offset));
          killControls = true;
          return;
      }

      var intersects = ray.intersectObject(maskMesh);

      if (intersects.length > 0) {
          if (INTERSECTED != intersects[0].object) {
              INTERSECTED = intersects[0].object;
              INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
              plane.position.copy(INTERSECTED.position);
          }
      }
      else {
          INTERSECTED = null;
      }
  }

  /** Removes event listeners when the mouse button is let go */
  function onDocumentMouseUp(event) {
      event.preventDefault();
      if (INTERSECTED) {
          plane.position.copy(INTERSECTED.position);
          SELECTED = null;
          killControls = false;
      }
  }

  /** Removes event listeners if the mouse runs off the renderer */
  function onDocumentMouseOut(event) {
      event.preventDefault();
      if (INTERSECTED) {
          plane.position.copy(INTERSECTED.position);
          SELECTED = null;
      }
  }



// PLACED in our main animation loop
// if (killControls) 
//   controls.enabled = false;
// else 
//   controls.update(delta);


// // inside animate()
// controls.update();
