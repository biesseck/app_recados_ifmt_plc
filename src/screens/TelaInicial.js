import React, { useState } from "react";
import {StyleSheet, Modal, Pressable, Text, View, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import * as Font from 'expo-font';
import {LinearGradient} from 'expo-linear-gradient';

const DDATA = [
	{
		id: '1',
		titulo: 'Chega de mentiras',
		data: '17/11/2005',
		info1: 'Informações adicionais',
		info2: 'Informações adicionais: Cara eu realmente não sei o que deveria ser colocado aqui',
		texto: `Fusce lacinia ac nulla non malesuada. Proin ante augue, lobortis non odio vitae, pretium placerat enim. Praesent scelerisque vulputate venenatis. Sed ut ipsum tortor. Vestibulum rutrum a nisl nec malesuada. Nam pretium lacinia auctor. Praesent rhoncus erat ac quam eleifend vestibulum. Aenean pulvinar hendrerit eros, et tincidunt mi pharetra ac. Aliquam semper, justo vel tincidunt dignissim, sem elit venenatis risus, a scelerisque tortor lacus sit amet eros. Donec sollicitudin euismod lectus pellentesque convallis. Morbi vestibulum at tortor laoreet convallis. Nam commodo mattis rhoncus. Integer vel imperdiet lorem.

		Maecenas nec tempus augue. Nunc volutpat efficitur ullamcorper. Praesent massa ante, convallis at convallis ut, vulputate at ante. Sed viverra eget nisi non consectetur. Morbi vitae sapien sit amet nisi interdum hendrerit. Sed at est velit. In aliquam risus elementum, pulvinar erat et, ullamcorper orci. Nam ac ultrices quam. In venenatis magna ex, quis tempus lectus posuere ac.
		
		Maecenas quis congue sapien. Suspendisse neque nisi, accumsan fermentum dictum non, pharetra sed eros. Sed dapibus laoreet congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis mollis odio. Ut volutpat tellus eget purus rhoncus, eu semper erat pulvinar. Pellentesque sed dui in ipsum tincidunt semper non nec est. Curabitur pretium purus et dictum lacinia. Cras in volutpat risus. Sed vitae quam mattis, efficitur dui in, viverra nunc.
		
		Sed ornare viverra tortor non interdum. Quisque velit enim, laoreet aliquam erat non, tempor rhoncus neque. Etiam eget sem felis. Duis lacinia, tortor quis tempus faucibus, sapien nulla maximus dui, id consequat dolor nisi a sapien. Cras sem arcu, posuere eget neque at, auctor varius nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed massa sit amet felis lobortis fermentum et ut nulla. In ornare urna sed augue facilisis, in porttitor massa bibendum. Nulla aliquam malesuada ex eu eleifend. Nunc eleifend bibendum odio ac malesuada. Etiam blandit urna lacinia, egestas lorem a, congue tortor. Nam fermentum, quam nec maximus tristique, erat turpis ornare tortor, a fringilla lorem ex non ex.
		
		Pellentesque dignissim auctor ultrices. Fusce posuere libero magna, a pretium neque vulputate a. Nulla aliquam mollis metus, quis finibus justo venenatis et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vestibulum velit tristique, vestibulum tellus quis, luctus ligula. Aliquam in velit commodo sem varius pulvinar. Cras at est purus. Morbi tincidunt lacus eget velit blandit auctor. Praesent lobortis interdum lectus, quis efficitur orci cursus non. Vivamus eget lacinia enim, at molestie libero. Praesent dolor est, dignissim ac diam sed, pharetra feugiat elit. Sed non mi at nunc vulputate lobortis eu et magna. Maecenas egestas facilisis augue ut bibendum. Sed tempus neque nulla, eget tempus purus vulputate et. Nam ac erat nec diam porttitor molestie. Cras fringilla posuere magna id consequat.
		
		`,
	},
	{
		id: '2',
		titulo: 'De negar',
		data: '02/01/1234',
		info1: 'Informações adicionais',
		info2: 'Informações adicionais: Cara eu realmente não sei o que deveria ser colocado aqui',
		texto: `Sed magna eros, varius quis cursus sed, hendrerit sit amet turpis. Duis congue sodales nisi. Curabitur consectetur vehicula neque in aliquet. Ut sit amet mi in erat convallis commodo sed sed justo. Nullam posuere suscipit nulla vel maximus. Vestibulum porttitor libero urna, vitae pharetra odio consectetur volutpat. Quisque ullamcorper odio ac lacus iaculis dignissim. Etiam id pulvinar est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras sodales vulputate nisl ac sollicitudin. Aenean finibus tortor sed dictum euismod.

		Sed a ex est. Cras ut ante nibh. Vestibulum velit eros, suscipit a enim a, pretium bibendum velit. Nam placerat neque a nibh semper elementum. Maecenas mollis libero ante, ut viverra elit tristique congue. Quisque sapien lacus, tristique vehicula auctor vitae, convallis sit amet sapien. Pellentesque vulputate in velit eu dapibus. Nullam nec tortor risus. Sed ullamcorper mi sit amet blandit sollicitudin. Vivamus pellentesque est ac magna aliquam fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus. In vitae ante nisl. Nam ac condimentum lectus, vitae congue ligula. Mauris a quam at odio semper ultrices. Fusce et purus a erat hendrerit porta et nec orci. Etiam luctus, nulla non vehicula mattis, ante tortor rhoncus eros, id consequat metus orci non orci.
		
		`,
	},
	{
		id: '3',
		titulo: 'o meu desejo',
		data: '56/78/AAAA',
		info1: 'Informações adicionais',
		info2: 'Informações adicionais: Cara eu realmente não sei o que deveria ser colocado aqui',
		texto: `Mauris laoreet augue id enim porttitor, non cursus ligula pharetra. Aliquam erat volutpat. Donec finibus hendrerit tortor, vitae venenatis sapien ornare et. Sed ac orci fringilla, pharetra elit eget, dictum lacus. Curabitur ac tempor felis. Curabitur sit amet augue at urna tempor bibendum. Praesent aliquam elit ac consectetur venenatis. Ut nisi felis, placerat ac ultrices a, pellentesque non est. Aliquam maximus eros eu purus auctor fringilla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla tempus dolor nisl, at gravida leo molestie a. Cras ac maximus ipsum. Nulla finibus diam ipsum, vel ullamcorper libero tempor id.

		Nullam consectetur orci nec nulla hendrerit, in efficitur turpis imperdiet. Fusce mollis maximus leo, ac egestas augue aliquet et. Duis ut pretium mauris. Ut rhoncus mollis odio, pharetra cursus est sollicitudin vitae. Suspendisse lacinia at nulla et finibus. In faucibus suscipit leo eget faucibus. Suspendisse convallis tempus velit a pulvinar.
		
		Fusce ut mollis ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc eget nibh in libero dignissim imperdiet. Duis fermentum ex ut mauris pellentesque tempus. Duis eget dolor a leo suscipit consequat. Duis ullamcorper non dui id cursus. Suspendisse a augue quis urna tristique tempus. Nulla at nisl eleifend, rutrum augue a, consectetur lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed consequat, diam non finibus dignissim, leo sapien mattis nulla, maximus lobortis odio mi ut elit.
		
		`,
	},
	{
		id: '4',
		titulo: 'Eu te quero',
		data: '16/01/2004',
		info1: 'Informações adicionais',
		info2: 'Informações adicionais: Cara eu realmente não sei o que deveria ser colocado aqui',
		texto: `Fusce lacinia ac nulla non malesuada. Proin ante augue, lobortis non odio vitae, pretium placerat enim. Praesent scelerisque vulputate venenatis. Sed ut ipsum tortor. Vestibulum rutrum a nisl nec malesuada. Nam pretium lacinia auctor. Praesent rhoncus erat ac quam eleifend vestibulum. Aenean pulvinar hendrerit eros, et tincidunt mi pharetra ac. Aliquam semper, justo vel tincidunt dignissim, sem elit venenatis risus, a scelerisque tortor lacus sit amet eros. Donec sollicitudin euismod lectus pellentesque convallis. Morbi vestibulum at tortor laoreet convallis. Nam commodo mattis rhoncus. Integer vel imperdiet lorem.

		Maecenas nec tempus augue. Nunc volutpat efficitur ullamcorper. Praesent massa ante, convallis at convallis ut, vulputate at ante. Sed viverra eget nisi non consectetur. Morbi vitae sapien sit amet nisi interdum hendrerit. Sed at est velit. In aliquam risus elementum, pulvinar erat et, ullamcorper orci. Nam ac ultrices quam. In venenatis magna ex, quis tempus lectus posuere ac.
		
		Maecenas quis congue sapien. Suspendisse neque nisi, accumsan fermentum dictum non, pharetra sed eros. Sed dapibus laoreet congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis mollis odio. Ut volutpat tellus eget purus rhoncus, eu semper erat pulvinar. Pellentesque sed dui in ipsum tincidunt semper non nec est. Curabitur pretium purus et dictum lacinia. Cras in volutpat risus. Sed vitae quam mattis, efficitur dui in, viverra nunc.
		
		Sed ornare viverra tortor non interdum. Quisque velit enim, laoreet aliquam erat non, tempor rhoncus neque. Etiam eget sem felis. Duis lacinia, tortor quis tempus faucibus, sapien nulla maximus dui, id consequat dolor nisi a sapien. Cras sem arcu, posuere eget neque at, auctor varius nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed massa sit amet felis lobortis fermentum et ut nulla. In ornare urna sed augue facilisis, in porttitor massa bibendum. Nulla aliquam malesuada ex eu eleifend. Nunc eleifend bibendum odio ac malesuada. Etiam blandit urna lacinia, egestas lorem a, congue tortor. Nam fermentum, quam nec maximus tristique, erat turpis ornare tortor, a fringilla lorem ex non ex.
		
		Pellentesque dignissim auctor ultrices. Fusce posuere libero magna, a pretium neque vulputate a. Nulla aliquam mollis metus, quis finibus justo venenatis et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vestibulum velit tristique, vestibulum tellus quis, luctus ligula. Aliquam in velit commodo sem varius pulvinar. Cras at est purus. Morbi tincidunt lacus eget velit blandit auctor. Praesent lobortis interdum lectus, quis efficitur orci cursus non. Vivamus eget lacinia enim, at molestie libero. Praesent dolor est, dignissim ac diam sed, pharetra feugiat elit. Sed non mi at nunc vulputate lobortis eu et magna. Maecenas egestas facilisis augue ut bibendum. Sed tempus neque nulla, eget tempus purus vulputate et. Nam ac erat nec diam porttitor molestie. Cras fringilla posuere magna id consequat.
		
		`,
	},
	{
		id: '5',
		titulo: 'mais que tudo',
		data: '16/01/2004',
		info1: 'Informações adicionais',
		info2: 'Informações adicionais: Cara eu realmente não sei o que deveria ser colocado aqui',
		texto: `Fusce lacinia ac nulla non malesuada. Proin ante augue, lobortis non odio vitae, pretium placerat enim. Praesent scelerisque vulputate venenatis. Sed ut ipsum tortor. Vestibulum rutrum a nisl nec malesuada. Nam pretium lacinia auctor. Praesent rhoncus erat ac quam eleifend vestibulum. Aenean pulvinar hendrerit eros, et tincidunt mi pharetra ac. Aliquam semper, justo vel tincidunt dignissim, sem elit venenatis risus, a scelerisque tortor lacus sit amet eros. Donec sollicitudin euismod lectus pellentesque convallis. Morbi vestibulum at tortor laoreet convallis. Nam commodo mattis rhoncus. Integer vel imperdiet lorem.

		Maecenas nec tempus augue. Nunc volutpat efficitur ullamcorper. Praesent massa ante, convallis at convallis ut, vulputate at ante. Sed viverra eget nisi non consectetur. Morbi vitae sapien sit amet nisi interdum hendrerit. Sed at est velit. In aliquam risus elementum, pulvinar erat et, ullamcorper orci. Nam ac ultrices quam. In venenatis magna ex, quis tempus lectus posuere ac.
		
		Maecenas quis congue sapien. Suspendisse neque nisi, accumsan fermentum dictum non, pharetra sed eros. Sed dapibus laoreet congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis mollis odio. Ut volutpat tellus eget purus rhoncus, eu semper erat pulvinar. Pellentesque sed dui in ipsum tincidunt semper non nec est. Curabitur pretium purus et dictum lacinia. Cras in volutpat risus. Sed vitae quam mattis, efficitur dui in, viverra nunc.
		
		Sed ornare viverra tortor non interdum. Quisque velit enim, laoreet aliquam erat non, tempor rhoncus neque. Etiam eget sem felis. Duis lacinia, tortor quis tempus faucibus, sapien nulla maximus dui, id consequat dolor nisi a sapien. Cras sem arcu, posuere eget neque at, auctor varius nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed massa sit amet felis lobortis fermentum et ut nulla. In ornare urna sed augue facilisis, in porttitor massa bibendum. Nulla aliquam malesuada ex eu eleifend. Nunc eleifend bibendum odio ac malesuada. Etiam blandit urna lacinia, egestas lorem a, congue tortor. Nam fermentum, quam nec maximus tristique, erat turpis ornare tortor, a fringilla lorem ex non ex.
		
		Pellentesque dignissim auctor ultrices. Fusce posuere libero magna, a pretium neque vulputate a. Nulla aliquam mollis metus, quis finibus justo venenatis et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vestibulum velit tristique, vestibulum tellus quis, luctus ligula. Aliquam in velit commodo sem varius pulvinar. Cras at est purus. Morbi tincidunt lacus eget velit blandit auctor. Praesent lobortis interdum lectus, quis efficitur orci cursus non. Vivamus eget lacinia enim, at molestie libero. Praesent dolor est, dignissim ac diam sed, pharetra feugiat elit. Sed non mi at nunc vulputate lobortis eu et magna. Maecenas egestas facilisis augue ut bibendum. Sed tempus neque nulla, eget tempus purus vulputate et. Nam ac erat nec diam porttitor molestie. Cras fringilla posuere magna id consequat.
		
		`,
	},
	{
		id: '6',
		titulo: 'Eu preciso',
		data: '16/01/2004',
		info1: 'Informações adicionais',
		info2: 'Informações adicionais: Cara eu realmente não sei o que deveria ser colocado aqui',
		texto: `Fusce lacinia ac nulla non malesuada. Proin ante augue, lobortis non odio vitae, pretium placerat enim. Praesent scelerisque vulputate venenatis. Sed ut ipsum tortor. Vestibulum rutrum a nisl nec malesuada. Nam pretium lacinia auctor. Praesent rhoncus erat ac quam eleifend vestibulum. Aenean pulvinar hendrerit eros, et tincidunt mi pharetra ac. Aliquam semper, justo vel tincidunt dignissim, sem elit venenatis risus, a scelerisque tortor lacus sit amet eros. Donec sollicitudin euismod lectus pellentesque convallis. Morbi vestibulum at tortor laoreet convallis. Nam commodo mattis rhoncus. Integer vel imperdiet lorem.

		Maecenas nec tempus augue. Nunc volutpat efficitur ullamcorper. Praesent massa ante, convallis at convallis ut, vulputate at ante. Sed viverra eget nisi non consectetur. Morbi vitae sapien sit amet nisi interdum hendrerit. Sed at est velit. In aliquam risus elementum, pulvinar erat et, ullamcorper orci. Nam ac ultrices quam. In venenatis magna ex, quis tempus lectus posuere ac.
		
		Maecenas quis congue sapien. Suspendisse neque nisi, accumsan fermentum dictum non, pharetra sed eros. Sed dapibus laoreet congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis mollis odio. Ut volutpat tellus eget purus rhoncus, eu semper erat pulvinar. Pellentesque sed dui in ipsum tincidunt semper non nec est. Curabitur pretium purus et dictum lacinia. Cras in volutpat risus. Sed vitae quam mattis, efficitur dui in, viverra nunc.
		
		Sed ornare viverra tortor non interdum. Quisque velit enim, laoreet aliquam erat non, tempor rhoncus neque. Etiam eget sem felis. Duis lacinia, tortor quis tempus faucibus, sapien nulla maximus dui, id consequat dolor nisi a sapien. Cras sem arcu, posuere eget neque at, auctor varius nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed massa sit amet felis lobortis fermentum et ut nulla. In ornare urna sed augue facilisis, in porttitor massa bibendum. Nulla aliquam malesuada ex eu eleifend. Nunc eleifend bibendum odio ac malesuada. Etiam blandit urna lacinia, egestas lorem a, congue tortor. Nam fermentum, quam nec maximus tristique, erat turpis ornare tortor, a fringilla lorem ex non ex.
		
		Pellentesque dignissim auctor ultrices. Fusce posuere libero magna, a pretium neque vulputate a. Nulla aliquam mollis metus, quis finibus justo venenatis et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vestibulum velit tristique, vestibulum tellus quis, luctus ligula. Aliquam in velit commodo sem varius pulvinar. Cras at est purus. Morbi tincidunt lacus eget velit blandit auctor. Praesent lobortis interdum lectus, quis efficitur orci cursus non. Vivamus eget lacinia enim, at molestie libero. Praesent dolor est, dignissim ac diam sed, pharetra feugiat elit. Sed non mi at nunc vulputate lobortis eu et magna. Maecenas egestas facilisis augue ut bibendum. Sed tempus neque nulla, eget tempus purus vulputate et. Nam ac erat nec diam porttitor molestie. Cras fringilla posuere magna id consequat.
		
		`,
	},
	{
		id: '7',
		titulo: 'do seu beijo',
		data: '16/01/2004',
		info1: 'Informações adicionais',
		info2: 'Informações adicionais: Cara eu realmente não sei o que deveria ser colocado aqui',
		texto: `Fusce lacinia ac nulla non malesuada. Proin ante augue, lobortis non odio vitae, pretium placerat enim. Praesent scelerisque vulputate venenatis. Sed ut ipsum tortor. Vestibulum rutrum a nisl nec malesuada. Nam pretium lacinia auctor. Praesent rhoncus erat ac quam eleifend vestibulum. Aenean pulvinar hendrerit eros, et tincidunt mi pharetra ac. Aliquam semper, justo vel tincidunt dignissim, sem elit venenatis risus, a scelerisque tortor lacus sit amet eros. Donec sollicitudin euismod lectus pellentesque convallis. Morbi vestibulum at tortor laoreet convallis. Nam commodo mattis rhoncus. Integer vel imperdiet lorem.

		Maecenas nec tempus augue. Nunc volutpat efficitur ullamcorper. Praesent massa ante, convallis at convallis ut, vulputate at ante. Sed viverra eget nisi non consectetur. Morbi vitae sapien sit amet nisi interdum hendrerit. Sed at est velit. In aliquam risus elementum, pulvinar erat et, ullamcorper orci. Nam ac ultrices quam. In venenatis magna ex, quis tempus lectus posuere ac.
		
		Maecenas quis congue sapien. Suspendisse neque nisi, accumsan fermentum dictum non, pharetra sed eros. Sed dapibus laoreet congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis mollis odio. Ut volutpat tellus eget purus rhoncus, eu semper erat pulvinar. Pellentesque sed dui in ipsum tincidunt semper non nec est. Curabitur pretium purus et dictum lacinia. Cras in volutpat risus. Sed vitae quam mattis, efficitur dui in, viverra nunc.
		
		Sed ornare viverra tortor non interdum. Quisque velit enim, laoreet aliquam erat non, tempor rhoncus neque. Etiam eget sem felis. Duis lacinia, tortor quis tempus faucibus, sapien nulla maximus dui, id consequat dolor nisi a sapien. Cras sem arcu, posuere eget neque at, auctor varius nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed massa sit amet felis lobortis fermentum et ut nulla. In ornare urna sed augue facilisis, in porttitor massa bibendum. Nulla aliquam malesuada ex eu eleifend. Nunc eleifend bibendum odio ac malesuada. Etiam blandit urna lacinia, egestas lorem a, congue tortor. Nam fermentum, quam nec maximus tristique, erat turpis ornare tortor, a fringilla lorem ex non ex.
		
		Pellentesque dignissim auctor ultrices. Fusce posuere libero magna, a pretium neque vulputate a. Nulla aliquam mollis metus, quis finibus justo venenatis et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vestibulum velit tristique, vestibulum tellus quis, luctus ligula. Aliquam in velit commodo sem varius pulvinar. Cras at est purus. Morbi tincidunt lacus eget velit blandit auctor. Praesent lobortis interdum lectus, quis efficitur orci cursus non. Vivamus eget lacinia enim, at molestie libero. Praesent dolor est, dignissim ac diam sed, pharetra feugiat elit. Sed non mi at nunc vulputate lobortis eu et magna. Maecenas egestas facilisis augue ut bibendum. Sed tempus neque nulla, eget tempus purus vulputate et. Nam ac erat nec diam porttitor molestie. Cras fringilla posuere magna id consequat.
		
		`,
	},
	{
		id: '8',
		titulo: 'Eu entrego',
		data: '16/01/2004',
		info1: 'Informações adicionais',
		info2: 'Informações adicionais: Cara eu realmente não sei o que deveria ser colocado aqui',
		texto: `Fusce lacinia ac nulla non malesuada. Proin ante augue, lobortis non odio vitae, pretium placerat enim. Praesent scelerisque vulputate venenatis. Sed ut ipsum tortor. Vestibulum rutrum a nisl nec malesuada. Nam pretium lacinia auctor. Praesent rhoncus erat ac quam eleifend vestibulum. Aenean pulvinar hendrerit eros, et tincidunt mi pharetra ac. Aliquam semper, justo vel tincidunt dignissim, sem elit venenatis risus, a scelerisque tortor lacus sit amet eros. Donec sollicitudin euismod lectus pellentesque convallis. Morbi vestibulum at tortor laoreet convallis. Nam commodo mattis rhoncus. Integer vel imperdiet lorem.

		Maecenas nec tempus augue. Nunc volutpat efficitur ullamcorper. Praesent massa ante, convallis at convallis ut, vulputate at ante. Sed viverra eget nisi non consectetur. Morbi vitae sapien sit amet nisi interdum hendrerit. Sed at est velit. In aliquam risus elementum, pulvinar erat et, ullamcorper orci. Nam ac ultrices quam. In venenatis magna ex, quis tempus lectus posuere ac.
		
		Maecenas quis congue sapien. Suspendisse neque nisi, accumsan fermentum dictum non, pharetra sed eros. Sed dapibus laoreet congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis mollis odio. Ut volutpat tellus eget purus rhoncus, eu semper erat pulvinar. Pellentesque sed dui in ipsum tincidunt semper non nec est. Curabitur pretium purus et dictum lacinia. Cras in volutpat risus. Sed vitae quam mattis, efficitur dui in, viverra nunc.
		
		Sed ornare viverra tortor non interdum. Quisque velit enim, laoreet aliquam erat non, tempor rhoncus neque. Etiam eget sem felis. Duis lacinia, tortor quis tempus faucibus, sapien nulla maximus dui, id consequat dolor nisi a sapien. Cras sem arcu, posuere eget neque at, auctor varius nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed massa sit amet felis lobortis fermentum et ut nulla. In ornare urna sed augue facilisis, in porttitor massa bibendum. Nulla aliquam malesuada ex eu eleifend. Nunc eleifend bibendum odio ac malesuada. Etiam blandit urna lacinia, egestas lorem a, congue tortor. Nam fermentum, quam nec maximus tristique, erat turpis ornare tortor, a fringilla lorem ex non ex.
		
		Pellentesque dignissim auctor ultrices. Fusce posuere libero magna, a pretium neque vulputate a. Nulla aliquam mollis metus, quis finibus justo venenatis et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vestibulum velit tristique, vestibulum tellus quis, luctus ligula. Aliquam in velit commodo sem varius pulvinar. Cras at est purus. Morbi tincidunt lacus eget velit blandit auctor. Praesent lobortis interdum lectus, quis efficitur orci cursus non. Vivamus eget lacinia enim, at molestie libero. Praesent dolor est, dignissim ac diam sed, pharetra feugiat elit. Sed non mi at nunc vulputate lobortis eu et magna. Maecenas egestas facilisis augue ut bibendum. Sed tempus neque nulla, eget tempus purus vulputate et. Nam ac erat nec diam porttitor molestie. Cras fringilla posuere magna id consequat.
		
		`,
	},
	{
		id: '9',
		titulo: 'a minha vida',
		data: '16/01/2004',
		info1: 'Informações adicionais',
		info2: 'Informações adicionais: Cara eu realmente não sei o que deveria ser colocado aqui',
		texto: `Fusce lacinia ac nulla non malesuada. Proin ante augue, lobortis non odio vitae, pretium placerat enim. Praesent scelerisque vulputate venenatis. Sed ut ipsum tortor. Vestibulum rutrum a nisl nec malesuada. Nam pretium lacinia auctor. Praesent rhoncus erat ac quam eleifend vestibulum. Aenean pulvinar hendrerit eros, et tincidunt mi pharetra ac. Aliquam semper, justo vel tincidunt dignissim, sem elit venenatis risus, a scelerisque tortor lacus sit amet eros. Donec sollicitudin euismod lectus pellentesque convallis. Morbi vestibulum at tortor laoreet convallis. Nam commodo mattis rhoncus. Integer vel imperdiet lorem.

		Maecenas nec tempus augue. Nunc volutpat efficitur ullamcorper. Praesent massa ante, convallis at convallis ut, vulputate at ante. Sed viverra eget nisi non consectetur. Morbi vitae sapien sit amet nisi interdum hendrerit. Sed at est velit. In aliquam risus elementum, pulvinar erat et, ullamcorper orci. Nam ac ultrices quam. In venenatis magna ex, quis tempus lectus posuere ac.
		
		Maecenas quis congue sapien. Suspendisse neque nisi, accumsan fermentum dictum non, pharetra sed eros. Sed dapibus laoreet congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis mollis odio. Ut volutpat tellus eget purus rhoncus, eu semper erat pulvinar. Pellentesque sed dui in ipsum tincidunt semper non nec est. Curabitur pretium purus et dictum lacinia. Cras in volutpat risus. Sed vitae quam mattis, efficitur dui in, viverra nunc.
		
		Sed ornare viverra tortor non interdum. Quisque velit enim, laoreet aliquam erat non, tempor rhoncus neque. Etiam eget sem felis. Duis lacinia, tortor quis tempus faucibus, sapien nulla maximus dui, id consequat dolor nisi a sapien. Cras sem arcu, posuere eget neque at, auctor varius nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed massa sit amet felis lobortis fermentum et ut nulla. In ornare urna sed augue facilisis, in porttitor massa bibendum. Nulla aliquam malesuada ex eu eleifend. Nunc eleifend bibendum odio ac malesuada. Etiam blandit urna lacinia, egestas lorem a, congue tortor. Nam fermentum, quam nec maximus tristique, erat turpis ornare tortor, a fringilla lorem ex non ex.
		
		Pellentesque dignissim auctor ultrices. Fusce posuere libero magna, a pretium neque vulputate a. Nulla aliquam mollis metus, quis finibus justo venenatis et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vestibulum velit tristique, vestibulum tellus quis, luctus ligula. Aliquam in velit commodo sem varius pulvinar. Cras at est purus. Morbi tincidunt lacus eget velit blandit auctor. Praesent lobortis interdum lectus, quis efficitur orci cursus non. Vivamus eget lacinia enim, at molestie libero. Praesent dolor est, dignissim ac diam sed, pharetra feugiat elit. Sed non mi at nunc vulputate lobortis eu et magna. Maecenas egestas facilisis augue ut bibendum. Sed tempus neque nulla, eget tempus purus vulputate et. Nam ac erat nec diam porttitor molestie. Cras fringilla posuere magna id consequat.
		
		`,
	},
	{
		id: '10',
		titulo: 'Pra você fazer o',
		data: '16/01/2004',
		info1: 'Informações adicionais',
		info2: 'Informações adicionais: Cara eu realmente não sei o que deveria ser colocado aqui',
		texto: `Fusce lacinia ac nulla non malesuada. Proin ante augue, lobortis non odio vitae, pretium placerat enim. Praesent scelerisque vulputate venenatis. Sed ut ipsum tortor. Vestibulum rutrum a nisl nec malesuada. Nam pretium lacinia auctor. Praesent rhoncus erat ac quam eleifend vestibulum. Aenean pulvinar hendrerit eros, et tincidunt mi pharetra ac. Aliquam semper, justo vel tincidunt dignissim, sem elit venenatis risus, a scelerisque tortor lacus sit amet eros. Donec sollicitudin euismod lectus pellentesque convallis. Morbi vestibulum at tortor laoreet convallis. Nam commodo mattis rhoncus. Integer vel imperdiet lorem.

		Maecenas nec tempus augue. Nunc volutpat efficitur ullamcorper. Praesent massa ante, convallis at convallis ut, vulputate at ante. Sed viverra eget nisi non consectetur. Morbi vitae sapien sit amet nisi interdum hendrerit. Sed at est velit. In aliquam risus elementum, pulvinar erat et, ullamcorper orci. Nam ac ultrices quam. In venenatis magna ex, quis tempus lectus posuere ac.
		
		Maecenas quis congue sapien. Suspendisse neque nisi, accumsan fermentum dictum non, pharetra sed eros. Sed dapibus laoreet congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis mollis odio. Ut volutpat tellus eget purus rhoncus, eu semper erat pulvinar. Pellentesque sed dui in ipsum tincidunt semper non nec est. Curabitur pretium purus et dictum lacinia. Cras in volutpat risus. Sed vitae quam mattis, efficitur dui in, viverra nunc.
		
		Sed ornare viverra tortor non interdum. Quisque velit enim, laoreet aliquam erat non, tempor rhoncus neque. Etiam eget sem felis. Duis lacinia, tortor quis tempus faucibus, sapien nulla maximus dui, id consequat dolor nisi a sapien. Cras sem arcu, posuere eget neque at, auctor varius nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed massa sit amet felis lobortis fermentum et ut nulla. In ornare urna sed augue facilisis, in porttitor massa bibendum. Nulla aliquam malesuada ex eu eleifend. Nunc eleifend bibendum odio ac malesuada. Etiam blandit urna lacinia, egestas lorem a, congue tortor. Nam fermentum, quam nec maximus tristique, erat turpis ornare tortor, a fringilla lorem ex non ex.
		
		Pellentesque dignissim auctor ultrices. Fusce posuere libero magna, a pretium neque vulputate a. Nulla aliquam mollis metus, quis finibus justo venenatis et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vestibulum velit tristique, vestibulum tellus quis, luctus ligula. Aliquam in velit commodo sem varius pulvinar. Cras at est purus. Morbi tincidunt lacus eget velit blandit auctor. Praesent lobortis interdum lectus, quis efficitur orci cursus non. Vivamus eget lacinia enim, at molestie libero. Praesent dolor est, dignissim ac diam sed, pharetra feugiat elit. Sed non mi at nunc vulputate lobortis eu et magna. Maecenas egestas facilisis augue ut bibendum. Sed tempus neque nulla, eget tempus purus vulputate et. Nam ac erat nec diam porttitor molestie. Cras fringilla posuere magna id consequat.
		
		`,
	},
	{
		id: '11',
		titulo: 'que quiser de mim',
		data: '16/01/2004',
		info1: 'Informações adicionais',
		info2: 'Informações adicionais: Cara eu realmente não sei o que deveria ser colocado aqui',
		texto: `Fusce lacinia ac nulla non malesuada. Proin ante augue, lobortis non odio vitae, pretium placerat enim. Praesent scelerisque vulputate venenatis. Sed ut ipsum tortor. Vestibulum rutrum a nisl nec malesuada. Nam pretium lacinia auctor. Praesent rhoncus erat ac quam eleifend vestibulum. Aenean pulvinar hendrerit eros, et tincidunt mi pharetra ac. Aliquam semper, justo vel tincidunt dignissim, sem elit venenatis risus, a scelerisque tortor lacus sit amet eros. Donec sollicitudin euismod lectus pellentesque convallis. Morbi vestibulum at tortor laoreet convallis. Nam commodo mattis rhoncus. Integer vel imperdiet lorem.

		Maecenas nec tempus augue. Nunc volutpat efficitur ullamcorper. Praesent massa ante, convallis at convallis ut, vulputate at ante. Sed viverra eget nisi non consectetur. Morbi vitae sapien sit amet nisi interdum hendrerit. Sed at est velit. In aliquam risus elementum, pulvinar erat et, ullamcorper orci. Nam ac ultrices quam. In venenatis magna ex, quis tempus lectus posuere ac.
		
		Maecenas quis congue sapien. Suspendisse neque nisi, accumsan fermentum dictum non, pharetra sed eros. Sed dapibus laoreet congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis mollis odio. Ut volutpat tellus eget purus rhoncus, eu semper erat pulvinar. Pellentesque sed dui in ipsum tincidunt semper non nec est. Curabitur pretium purus et dictum lacinia. Cras in volutpat risus. Sed vitae quam mattis, efficitur dui in, viverra nunc.
		
		Sed ornare viverra tortor non interdum. Quisque velit enim, laoreet aliquam erat non, tempor rhoncus neque. Etiam eget sem felis. Duis lacinia, tortor quis tempus faucibus, sapien nulla maximus dui, id consequat dolor nisi a sapien. Cras sem arcu, posuere eget neque at, auctor varius nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed massa sit amet felis lobortis fermentum et ut nulla. In ornare urna sed augue facilisis, in porttitor massa bibendum. Nulla aliquam malesuada ex eu eleifend. Nunc eleifend bibendum odio ac malesuada. Etiam blandit urna lacinia, egestas lorem a, congue tortor. Nam fermentum, quam nec maximus tristique, erat turpis ornare tortor, a fringilla lorem ex non ex.
		
		Pellentesque dignissim auctor ultrices. Fusce posuere libero magna, a pretium neque vulputate a. Nulla aliquam mollis metus, quis finibus justo venenatis et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vestibulum velit tristique, vestibulum tellus quis, luctus ligula. Aliquam in velit commodo sem varius pulvinar. Cras at est purus. Morbi tincidunt lacus eget velit blandit auctor. Praesent lobortis interdum lectus, quis efficitur orci cursus non. Vivamus eget lacinia enim, at molestie libero. Praesent dolor est, dignissim ac diam sed, pharetra feugiat elit. Sed non mi at nunc vulputate lobortis eu et magna. Maecenas egestas facilisis augue ut bibendum. Sed tempus neque nulla, eget tempus purus vulputate et. Nam ac erat nec diam porttitor molestie. Cras fringilla posuere magna id consequat.
		
		`,
	},
	{
		id: '12',
		titulo: 'Só quero ouvir você dizer que sim!',
		data: '16/01/2004',
		info1: 'Informações adicionais',
		info2: 'Informações adicionais: Cara eu realmente não sei o que deveria ser colocado aqui',
		texto: `Fusce lacinia ac nulla non malesuada. Proin ante augue, lobortis non odio vitae, pretium placerat enim. Praesent scelerisque vulputate venenatis. Sed ut ipsum tortor. Vestibulum rutrum a nisl nec malesuada. Nam pretium lacinia auctor. Praesent rhoncus erat ac quam eleifend vestibulum. Aenean pulvinar hendrerit eros, et tincidunt mi pharetra ac. Aliquam semper, justo vel tincidunt dignissim, sem elit venenatis risus, a scelerisque tortor lacus sit amet eros. Donec sollicitudin euismod lectus pellentesque convallis. Morbi vestibulum at tortor laoreet convallis. Nam commodo mattis rhoncus. Integer vel imperdiet lorem.

		Maecenas nec tempus augue. Nunc volutpat efficitur ullamcorper. Praesent massa ante, convallis at convallis ut, vulputate at ante. Sed viverra eget nisi non consectetur. Morbi vitae sapien sit amet nisi interdum hendrerit. Sed at est velit. In aliquam risus elementum, pulvinar erat et, ullamcorper orci. Nam ac ultrices quam. In venenatis magna ex, quis tempus lectus posuere ac.
		
		Maecenas quis congue sapien. Suspendisse neque nisi, accumsan fermentum dictum non, pharetra sed eros. Sed dapibus laoreet congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis mollis odio. Ut volutpat tellus eget purus rhoncus, eu semper erat pulvinar. Pellentesque sed dui in ipsum tincidunt semper non nec est. Curabitur pretium purus et dictum lacinia. Cras in volutpat risus. Sed vitae quam mattis, efficitur dui in, viverra nunc.
		
		Sed ornare viverra tortor non interdum. Quisque velit enim, laoreet aliquam erat non, tempor rhoncus neque. Etiam eget sem felis. Duis lacinia, tortor quis tempus faucibus, sapien nulla maximus dui, id consequat dolor nisi a sapien. Cras sem arcu, posuere eget neque at, auctor varius nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed massa sit amet felis lobortis fermentum et ut nulla. In ornare urna sed augue facilisis, in porttitor massa bibendum. Nulla aliquam malesuada ex eu eleifend. Nunc eleifend bibendum odio ac malesuada. Etiam blandit urna lacinia, egestas lorem a, congue tortor. Nam fermentum, quam nec maximus tristique, erat turpis ornare tortor, a fringilla lorem ex non ex.
		
		Pellentesque dignissim auctor ultrices. Fusce posuere libero magna, a pretium neque vulputate a. Nulla aliquam mollis metus, quis finibus justo venenatis et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vestibulum velit tristique, vestibulum tellus quis, luctus ligula. Aliquam in velit commodo sem varius pulvinar. Cras at est purus. Morbi tincidunt lacus eget velit blandit auctor. Praesent lobortis interdum lectus, quis efficitur orci cursus non. Vivamus eget lacinia enim, at molestie libero. Praesent dolor est, dignissim ac diam sed, pharetra feugiat elit. Sed non mi at nunc vulputate lobortis eu et magna. Maecenas egestas facilisis augue ut bibendum. Sed tempus neque nulla, eget tempus purus vulputate et. Nam ac erat nec diam porttitor molestie. Cras fringilla posuere magna id consequat.
		
		`,
	},
]

export default class TelaInicial extends React.Component {

constructor(props) {
	super(props);
}

state = {
    fontsLoaded: false,	// State pra impedir a tela de carregar antes da fonte;
};

async loadFonts() {		// Função pra carregar as fontes.
	await Font.loadAsync({
		MerriweatherSans: require('../../assets/fonts/MerriweatherSans.ttf'),
		RobotoRegular: require('../../assets/fonts/RobotoRegular.ttf'),
		MerriweatherRegular: require('../../assets/fonts/MerriweatherRegular.ttf'),
	});
	this.setState({ fontsLoaded: true });
}
componentDidMount() {
	this.loadFonts();
}


Card = ({titulo,texto,data,info1,info2}) => { // Componente personalizado pros cards de notificação.

	const [textHeight, setTextHeight] = useState(null)
	const [modalVisible, setModalVisible] = useState(false);

	function find_dimensions(layout){
		setTextHeight(layout.height)
		// Debug: alert(layout.height)
	}

	if(textHeight == null){ // Pegando o tamanho do texto primeiro pra depois decidir que q eu faço da vida.
		return(
		<View style = {styles.card_container} >
			<View style = {{flexDirection: 'row'}} >
				<Text style = {styles.card_titulo} >{titulo}</Text>
				<Text style = {styles.card_data} >{data}</Text>
			</View>
			<View style = {styles.card_line} />
			<Text 
				style = {styles.card_text} 
				onLayout={ (event) => { find_dimensions(event.nativeEvent.layout) }}
			>{texto}</Text>
		</View>
	)}

	// Decidindo se o texto passa ou não do tamanho máximo e o que fazer com ele.
	if(textHeight <= 121){
		return(
		<View style = {styles.card_container} >
			<View style = {{flexDirection: 'row'}} >
				<Text style = {styles.card_titulo} >{titulo}</Text>
				<Text style = {styles.card_data} >{data}</Text>
			</View>
			<View style = {styles.card_line} />
			<View style = {styles.card_text_container} >
				<Text style = {[styles.card_text, {maxHeight: (13 * 9) }]} >{texto}</Text>
			</View>
		</View>
	)}
	if(textHeight > 121){
		return(	
		<TouchableOpacity 
			style = {styles.card_container}  
			activeOpacity = {0.95} // Não consegui usar o TouchableWithoutFeedback
			onPress = {() => setModalVisible(true)}
		>
			<View style = {{flexDirection: 'row'}} >
				<Text style = {styles.card_titulo} >{titulo}</Text>
				<Text style = {styles.card_data} >{data}</Text>
			</View>
			<View style = {styles.card_line} />
			<Text style = {[styles.card_text, {maxHeight: (13 * 9) }]} >{texto}</Text>
			<LinearGradient colors={['rgba(255,255,255,0)', '#fff',]} style={styles.card_gradient}/>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
			}}>
				<View style={styles.card_overlay_container}>
					<Pressable
						style = {{
							height: '40%',
							width: '100%',
						}}
						onPress={() => setModalVisible(!modalVisible)}
					/>
					<View style={styles.card_overlay_background}>
						<View style = {{width: '95%', height: '98%'}}>
							<Text style = {[styles.card_titulo, {fontSize: 24}]}>{titulo}</Text>
							<Text style = {styles.card_overlay_data} >
								<Text style = {{color: '#CD191E'}} >{info1}</Text> - {data}
							</Text>
							<Text style = {[styles.card_overlay_data, {textAlign: 'justify'}]} >{info2}</Text>
							<View style = {styles.card_line} />
							<ScrollView>
								<Text style = {[styles.card_text, {marginHorizontal: '1.5%'}]} >{texto}</Text>
							</ScrollView>
						</View>
					</View>
				</View>
			</Modal>
		</TouchableOpacity>
	)}
}

render() {
	if(this.state.fontsLoaded){
  	return (
		<View style = {styles.container}>
			<View style = {styles.flatlist_container}>
				<FlatList
					data = {DDATA}
					renderItem = {({item}) => (
						<this.Card
							texto = {item.texto}
							titulo = {item.titulo}
							data = {item.data}
							info1 = {item.info1}
							info2 = {item.info2}
						/>
					)}
				/>
			</View>
		</View>
	);}
	else return null
}
}

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
    	backgroundColor: '#2F9E41',
    	alignItems: 'center',
    	justifyContent: 'center',
  	},
	flatlist_container: {
		width: '95%',
		height: '100%',
	},
	card_container:{
		backgroundColor: '#fff',
		padding: 10,
		paddingTop: 2,
		width: '100%',
		flex: 1,
		marginVertical: 10,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		paddingBottom: 30,
	},
	card_titulo: {
		color: '#2F9E41',
		fontSize: 20,
		fontWeight: '100',
		fontFamily: 'MerriweatherSans'
	},
	card_data: {
		fontSize: 12,
		color: '#ADADAD',
		marginLeft: 11,
		fontFamily: 'RobotoRegular',
	},
	card_overlay_data: {
		fontSize: 11,
		color: '#ADADAD',
		fontFamily: 'RobotoRegular',
	},
	card_line: {
		backgroundColor: '#ADADAD',
		height: 2,
		borderRadius: 15,
		marginBottom: 5,
		marginTop: 3,
	},
	card_text: {
		textAlign: 'justify',
		fontFamily: 'MerriweatherRegular',
		fontSize: 12,
	},
	card_gradient: {
		width: '100%',
		height: '15%',
		marginTop: -20,
	},
	card_overlay_container: {
		flex: 1,
		alignItems: 'center',
    	justifyContent: 'flex-end',
	},
	card_overlay_background: {
		backgroundColor: '#fff',
		width: '100%',
		borderTopEndRadius: 10,
		borderTopLeftRadius: 10,
		height: '70%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});