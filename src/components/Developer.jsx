import React, { useEffect, useRef, useMemo } from 'react'
import { useGraph } from '@react-three/fiber'
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

// Pre-load all models and animations
const MODEL_PATH = '/models/Developer.glb'
const ANIMATIONS = {
  idle: '/models/animations/idle.fbx',
  salute: '/models/animations/salute.fbx',
  clapping: '/models/animations/clapping.fbx',
  victory: '/models/animations/victory.fbx'
}

// Preload the model and animations
useGLTF.preload(MODEL_PATH)
Object.values(ANIMATIONS).forEach(path => useFBX.preload(path))

const Developer = ({ animationName = 'idle', ...props }) => {
  const group = useRef()

  // Load the model
  const { scene } = useGLTF(MODEL_PATH)
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)

  // Load all animations once
  const fbxData = useMemo(() => ({
    idle: useFBX(ANIMATIONS.idle),
    salute: useFBX(ANIMATIONS.salute),
    clapping: useFBX(ANIMATIONS.clapping),
    victory: useFBX(ANIMATIONS.victory)
  }), [])

  // Process animations
  const animations = useMemo(() => {
    return {
      idle: Object.assign(fbxData.idle.animations[0].clone(), { name: 'idle' }),
      salute: Object.assign(fbxData.salute.animations[0].clone(), { name: 'salute' }),
      clapping: Object.assign(fbxData.clapping.animations[0].clone(), { name: 'clapping' }),
      victory: Object.assign(fbxData.victory.animations[0].clone(), { name: 'victory' })
    }
  }, [fbxData])

  // Setup animations
  const { actions } = useAnimations(Object.values(animations), group)

  // Handle animation changes
  useEffect(() => {
    if (!actions) return

    const cleanup = () => {
      Object.values(actions).forEach(action => {
        if (action?.isRunning()) {
          action.fadeOut(0.5)
        }
      })
    }

    cleanup()

    if (actions[animationName]) {
      actions[animationName].reset().fadeIn(0.5).play()
    }

    return cleanup
  }, [actions, animationName])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  )
}

export default Developer