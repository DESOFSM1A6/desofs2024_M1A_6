export const cartesianData = {

    xUpperLimit: 100,
    xLowerLimit: -100,
    yUpperLimit: 100,
    yLowerLimit: -100,
    zUpperLimit: 100,
    zLowerLimit: 0
}

export const roundaboutData = {

    roundaboutURL: "../../../assets/roundabout/roundabout.png",
    radius: 3,
    segments: 32,
    color: 0x878787,
    infinitesimal: 0.01,
    k: 4
}

export const warehouseData = {

    warehouse1URL: "../../../assets/warehouse/armazem1.gltf",
    warehouse2URL: "../../../assets/warehouse/armazem2.gltf",
    warehouse3URL: "../../../assets/warehouse/armazem3.gltf",
    scale: 0.3,
    // Model constraints. Our warehouse models dig a bit under their z-pos axis.
    zDiff: 0.25
}

export const connectionData = {

    k: 1.5,
    width: 3,
    textureRepeatDivisor: 2
}

export const streetData = {

    streetURL: "../../../assets/road/testTexturesCom_Roads0059_1_seamless_S.png",
    textureRepeatDivisor: 4
}

export const groundData = {

    groundURL: "../../../assets/ground/TexturesCom_Rock_Asteroid_header.jpg",
    height: 300,
    width: 300
}

export const skyboxData = {

    frontURL: "../../../assets/skybox/skybox_front.png",
    backURL: "../../../assets/skybox/skybox_back.png",
    downURL: "../../../assets/skybox/skybox_down.png",
    upURL: "../../../assets/skybox/skybox_up.png",
    leftURL: "../../../assets/skybox/skybox_left.png",
    rightURL: "../../../assets/skybox/skybox_right.png",
    height: 1000,
    width: 1000,
    depth: 1000
}