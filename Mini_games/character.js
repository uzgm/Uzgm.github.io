// character.js - 2D 캐릭터 멀티 본(Bone) 관절 모듈

export class BioCharacterSystem {
    constructor(ctx) {
        this.ctx = ctx;
    }

    // 캐릭터 및 배경 렌더링
    drawScene(thrustProgress = 0, particles = []) {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // 1. 배경 매트 그리드
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 2;
        for (let i = 0; i < ctx.canvas.width; i += 40) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, ctx.canvas.height); ctx.stroke();
        }

        ctx.strokeStyle = '#ff5722';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(30, 215);
        ctx.lineTo(490, 215);
        ctx.stroke();

        // 2. 여성 캐릭터 관절
        let fHipX = 220, fHipY = 165;
        let fKneeX = 290 + (thrustProgress * 6);
        let fKneeY = 195 - (thrustProgress * 4);
        let fAnkleX = 380, fAnkleY = 212;

        ctx.fillStyle = '#ffcc99';
        ctx.beginPath();
        ctx.moveTo(fHipX - 15, fHipY + 10);
        ctx.lineTo(fKneeX - 18, fKneeY);
        ctx.lineTo(fAnkleX, fAnkleY);
        ctx.lineTo(fAnkleX, fAnkleY + 10);
        ctx.lineTo(fKneeX + 18, fKneeY + 15);
        ctx.lineTo(fHipX + 15, fHipY + 25);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#e91e63';
        ctx.beginPath(); ctx.arc(fHipX, fHipY, 30, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#ff4081';
        ctx.fillRect(fHipX - 110, fHipY - 25, 110, 42);

        // 여성 머리 및 헤어
        ctx.fillStyle = '#6d4c41';
        ctx.beginPath();
        ctx.moveTo(fHipX - 95, fHipY - 22);
        ctx.quadraticCurveTo(fHipX - 120, fHipY, fHipX - 105, fHipY + 25);
        ctx.lineTo(fHipX - 75, fHipY + 10);
        ctx.lineTo(fHipX - 80, fHipY - 22);
        ctx.fill();

        ctx.beginPath(); ctx.arc(fHipX - 85, fHipY - 12, 18, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffcc99';
        ctx.beginPath(); ctx.arc(fHipX - 72, fHipY - 10, 14, 0, Math.PI * 2); ctx.fill();

        // 3. 남성 캐릭터 관절
        ctx.save();
        let mBaseX = 210;
        let currentMaleX = mBaseX - (thrustProgress * 16);
        let mHipX = currentMaleX, mHipY = 163;
        let mKneeX = mHipX + 35 + (thrustProgress * 8), mKneeY = 192;
        let mAnkleX = mHipX + 65, mAnkleY = 215;

        ctx.fillStyle = '#303f9f';
        ctx.beginPath();
        ctx.moveTo(mHipX - 12, mHipY + 10);
        ctx.lineTo(mKneeX - 14, mKneeY);
        ctx.lineTo(mAnkleX, mAnkleY);
        ctx.lineTo(mAnkleX + 15, mAnkleY);
        ctx.lineTo(mKneeX + 14, mKneeY + 12);
        ctx.lineTo(mHipX + 18, mHipY + 20);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#303f9f';
        ctx.beginPath(); ctx.arc(mHipX, mHipY, 28, 0, Math.PI * 2); ctx.fill();

        ctx.translate(mHipX, mHipY);
        ctx.rotate(-0.45 + (thrustProgress * 0.03));

        ctx.fillStyle = '#3f51b5';
        ctx.fillRect(-12, -75, 45, 75);

        ctx.strokeStyle = '#3f51b5';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(5, -35);
        ctx.lineTo(-30, -5);
        ctx.lineTo(-45, -25);
        ctx.stroke();

        ctx.fillStyle = '#212121';
        ctx.beginPath(); ctx.arc(20, -95, 15, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffcc99';
        ctx.beginPath(); ctx.arc(10, -88, 15, 0, Math.PI * 2); ctx.fill();

        ctx.restore();

        // 4. 파티클 렌더링
        for (let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            if (p.life <= 0) particles.splice(i, 1);
        }
    }
}
