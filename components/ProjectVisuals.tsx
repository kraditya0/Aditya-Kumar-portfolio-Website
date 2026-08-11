"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/content";

export function ProjectVisual({ type }: { type: Project["id"] }) {
  if (type === "toxic") return <ToxicVisual />;
  if (type === "placement") return <PlacementVisual />;
  return <ExpenseVisual />;
}

function ToxicVisual() {
  const reduceMotion = useReducedMotion();
  const pipeline = ["Text", "TF-IDF", "Features", "Models", "Classify"];

  return (
    <div className="project-visual toxic-visual" aria-hidden="true">
      <div className="visual-label">NLP / CLASSIFICATION PIPELINE</div>
      <div className="pipeline">
        {pipeline.map((step, index) => (
          <div className="pipeline-step-wrap" key={step}>
            <motion.div
              className={`pipeline-step step-${index}`}
              animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 3.4, delay: index * 0.2, repeat: Infinity }}
            >
              <span>0{index + 1}</span>
              <strong>{step}</strong>
            </motion.div>
            {index < pipeline.length - 1 && <div className="pipeline-line"><i /></div>}
          </div>
        ))}
      </div>
      <div className="classifier-console">
        <div><span>input.comment</span><code>&quot;sample text stream...&quot;</code></div>
        <div><span>model.ensemble</span><code>LightGBM + XGBoost</code></div>
        <div className="console-result"><span>leaderboard</span><strong>0.81+</strong></div>
      </div>
    </div>
  );
}

function PlacementVisual() {
  return (
    <div className="project-visual placement-visual" aria-hidden="true">
      <div className="mock-sidebar">
        <div className="mock-logo">P</div>
        {Array.from({ length: 5 }).map((_, index) => <i key={index} className={index === 0 ? "selected" : ""} />)}
      </div>
      <div className="mock-dashboard">
        <div className="mock-header">
          <div><span>PLACEMENT PORTAL</span><strong>Drive management</strong></div>
          <div className="mock-avatar">AK</div>
        </div>
        <div className="mock-metrics">
          <div><span>Active drives</span><strong>08</strong><i className="metric-cyan" /></div>
          <div><span>Applications</span><strong>24</strong><i className="metric-lime" /></div>
          <div><span>Eligible</span><strong>18</strong><i className="metric-coral" /></div>
        </div>
        <div className="mock-table">
          <div className="mock-row mock-row-head"><span>Drive</span><span>Role</span><span>Status</span></div>
          <div className="mock-row"><span><i /> Company A</span><span>Engineering</span><b>ACTIVE</b></div>
          <div className="mock-row"><span><i /> Company B</span><span>Data</span><b>ACTIVE</b></div>
          <div className="mock-row"><span><i /> Company C</span><span>Analyst</span><b className="review">REVIEW</b></div>
        </div>
      </div>
    </div>
  );
}

function ExpenseVisual() {
  const bars = [38, 54, 43, 70, 62, 84, 65, 92, 78, 88, 72, 96];
  return (
    <div className="project-visual expense-visual" aria-hidden="true">
      <div className="expense-head">
        <div><span>ANALYTICS OVERVIEW</span><strong>Monthly spending</strong></div>
        <span className="period-chip">This year</span>
      </div>
      <div className="expense-main">
        <div className="chart-panel">
          <div className="bar-chart">
            {bars.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
          </div>
          <div className="chart-axis"><span>JAN</span><span>APR</span><span>JUL</span><span>OCT</span></div>
        </div>
        <div className="budget-panel">
          <span>BUDGET STATUS</span>
          <div className="budget-ring"><strong>68%</strong><i /></div>
          <div className="budget-key"><span><i /> Used</span><span><i /> Remaining</span></div>
        </div>
      </div>
      <div className="category-row">
        <span><i className="cat-lime" /> Essentials</span>
        <span><i className="cat-cyan" /> Transport</span>
        <span><i className="cat-coral" /> Other</span>
      </div>
    </div>
  );
}
