varying vec2 vUV;
uniform sampler2D textureSampler;
uniform float curve;
uniform float scan;
uniform float fisheye;

void main(void) {
    vec2 uv = vUV;
    vec2 dc = abs(0.5-uv);
    dc *= dc;

    // Curve the fragment coordinates
    uv -= 0.5;
    uv.x *= 0.99 + (dc.y * 0.4 * curve);
    uv.y *= 1.0 + (dc.x * 0.5 * curve);
    uv += 0.5;

    if (uv.y > 1.0 || uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0)
        gl_FragColor = vec4(0.0,0.0,0.0,1.0);
    else {
        float apply = abs(sin(gl_FragCoord.y) * 0.07 * scan);           // Draw scanline
        
        vec2 centeredUV = vUV - vec2(0.5, 0.5); // Center the UV coordinates and calculate distance
        float dist = length(centeredUV);

        if (dist > 0.9) 
            discard; // (roughly) Discard pixels pushed outside the visible area

        float scale = 0.8 + fisheye * pow(dist, 2.0);
        vec2 newUV = centeredUV * scale + vec2(0.5, 0.5); // Re-center UV coordinates
        
    	gl_FragColor = vec4(mix(texture2D(textureSampler, newUV).rgb,vec3(0.0),apply),1.0);
    }
}

