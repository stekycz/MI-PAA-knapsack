INSTANCE_COUNT = 50

# Compilation

all: clean
	gcc -lm -O3 -Wall knapcore.c knapgen.c -o knapgen

clean:
	rm knapgen

# Generating

generateAll: capacityToWeight maxWeight maxPrice granularityMoreSmall granularityMoreLarge

capacityToWeight: all
	for j in 10 15 20 25 30; do \
		for i in $$(seq -w 0.1 0.1 1); do \
			filename=../gen_zadani/capacityToWeight/knap_"$$j"_"$$i".inst.dat ; \
			./knapgen -I 15000 -n $$j -N $(INSTANCE_COUNT) -m $$i -W 50 -C 50 -k 1 -d 0 > $$filename ; \
		done ; \
	done

maxWeight: all
	for j in 10 15 20 25 30; do \
		for i in $$(seq -w 50 50 500); do \
			filename=../gen_zadani/maxWeight/knap_"$$j"_"$$i".inst.dat ; \
			./knapgen -I 16000 -n $$j -N $(INSTANCE_COUNT) -m 0.5 -W $$i -C 50 -k 1 -d 0 > $$filename ; \
		done ; \
	done

maxPrice: all
	for j in 10 15 20 25 30; do \
		for i in $$(seq -w 50 50 500); do \
			filename=../gen_zadani/maxPrice/knap_"$$j"_"$$i".inst.dat ; \
			./knapgen -I 17000 -n $$j -N $(INSTANCE_COUNT) -m 0.5 -W 50 -C $$i -k 1 -d 0 > $$filename ; \
		done ; \
	done

granularityMoreSmall: all
	for j in 10 15 20 25 30; do \
		for i in $$(seq -w 0.1 0.1 2); do \
			filename=../gen_zadani/granularityMoreSmall/knap_"$$j"_"$$i".inst.dat ; \
			./knapgen -I 18000 -n $$j -N $(INSTANCE_COUNT) -m 0.5 -W 50 -C 50 -k $$i -d -1 > $$filename ; \
		done ; \
	done

granularityMoreLarge: all
	for j in 10 15 20 25 30; do \
		for i in $$(seq -w 0.1 0.1 2); do \
			filename=../gen_zadani/granularityMoreLarge/knap_"$$j"_"$$i".inst.dat ; \
			./knapgen -I 19000 -n $$j -N $(INSTANCE_COUNT) -m 0.5 -W 50 -C 50 -k $$i -d 1 > $$filename ; \
		done ; \
	done
