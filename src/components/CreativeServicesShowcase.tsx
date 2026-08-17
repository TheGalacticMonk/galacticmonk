"use client";

import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  CREATIVE_SERVICES,
  CREATIVE_SHOWCASE_MOBILE_QUERY,
  normalizeCreativeServiceIndex,
  type CreativeServiceIndex,
} from "@/lib/creative-services";
import CelestialServiceCanvas from "./CelestialServiceCanvas";
import styles from "./CreativeServicesShowcase.module.css";

class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("The decorative creative-services canvas could not start.", error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function CreativeServicesShowcase() {
  const [selectedService, setSelectedService] =
    useState<CreativeServiceIndex>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [canvasMode, setCanvasMode] = useState<"wide" | "compact">("wide");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeService = CREATIVE_SERVICES[selectedService];

  useEffect(() => {
    const compactQuery = window.matchMedia(CREATIVE_SHOWCASE_MOBILE_QUERY);
    const updateCanvasMode = () => {
      setCanvasMode(compactQuery.matches ? "compact" : "wide");
    };

    updateCanvasMode();
    compactQuery.addEventListener("change", updateCanvasMode);

    return () => compactQuery.removeEventListener("change", updateCanvasMode);
  }, []);

  const selectService = useCallback((index: CreativeServiceIndex) => {
    setSelectedService(index);
  }, []);

  const handleCanvasTransition = useCallback((active: boolean) => {
    setIsTransitioning(active);
  }, []);

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: CreativeServiceIndex
  ) {
    let nextIndex: CreativeServiceIndex | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = normalizeCreativeServiceIndex(currentIndex + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = normalizeCreativeServiceIndex(currentIndex - 1);
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = normalizeCreativeServiceIndex(CREATIVE_SERVICES.length - 1);
    }

    if (nextIndex === null) return;

    event.preventDefault();
    selectService(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  const accentStyle = {
    "--accent-a": activeService.accentA,
    "--accent-b": activeService.accentB,
  } as CSSProperties;

  return (
    <>
      <div className={styles.stage} style={accentStyle}>
        <div className={styles.serviceConsole}>
          <div className={styles.serviceTabs} role="tablist" aria-label="Creative services">
            {CREATIVE_SERVICES.map((service, index) => {
              const serviceIndex = index as CreativeServiceIndex;
              const isSelected = serviceIndex === selectedService;
              const rowAccentStyle = {
                "--row-accent-a": service.accentA,
                "--row-accent-b": service.accentB,
              } as CSSProperties;

              return (
                <button
                  key={service.name}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={`creative-service-tab-${index}`}
                  type="button"
                  role="tab"
                  data-service-index={index}
                  aria-controls={`creative-service-panel-${index}`}
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => selectService(serviceIndex)}
                  onKeyDown={(event) => handleTabKeyDown(event, serviceIndex)}
                  style={rowAccentStyle}
                  className={`${styles.railRow} ${isSelected ? styles.isActive : ""}`}
                >
                  <span className={styles.railDot} aria-hidden="true" />
                  <span className={styles.railLabel}>{service.name}</span>
                </button>
              );
            })}
          </div>

          {CREATIVE_SERVICES.map((service, index) => {
            const serviceIndex = index as CreativeServiceIndex;
            const isSelected = serviceIndex === selectedService;

            return (
              <section
                key={service.name}
                id={`creative-service-panel-${index}`}
                role="tabpanel"
                aria-labelledby={`creative-service-tab-${index}`}
                hidden={!isSelected}
                tabIndex={0}
                className={styles.serviceCopy}
              >
                <div className={styles.serviceKicker}>{service.kicker}</div>
                <h3 className={styles.serviceName}>{service.name}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <div
                  key={isSelected ? `meter-${selectedService}` : undefined}
                  className={`${styles.transitionMeter} ${
                    isSelected && isTransitioning ? styles.isActive : ""
                  }`}
                  aria-hidden="true"
                >
                  <div className={styles.transitionMeterFill} />
                </div>
              </section>
            );
          })}

          <CanvasErrorBoundary>
            <CelestialServiceCanvas
              key={canvasMode}
              selectedPreset={selectedService}
              onTransitionStateChange={handleCanvasTransition}
            />
          </CanvasErrorBoundary>
        </div>
      </div>

      <noscript>
        <style>{`.${styles.stage} { display: none !important; }`}</style>
        <div className={styles.noScriptServices}>
          {CREATIVE_SERVICES.map((service) => (
            <article key={service.name} className={styles.noScriptService}>
              <p className={styles.serviceKicker}>{service.kicker}</p>
              <h3 className={styles.noScriptServiceName}>{service.name}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
            </article>
          ))}
        </div>
      </noscript>
    </>
  );
}
